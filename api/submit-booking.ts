import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

interface VercelRequest {
  method?: string;
  body?: Record<string, any>;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: Record<string, any>) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    clientName,
    clientEmail,
    clientPhone,
    eventType,
    eventDate,
    guestCount,
    cateringTier,
    cateringNotes,
    decorTheme,
    selectedExtras,
    soundPackage,
    specialRequests,
    estimatedTotal,
  } = req.body || {};

  // Strict server-side validation for required fields
  if (
    !clientName ||
    !clientEmail ||
    !clientPhone ||
    !eventType ||
    !eventDate ||
    !guestCount ||
    !specialRequests
  ) {
    return res.status(400).json({
      error: 'Please complete all required booking and enquiry fields.',
    });
  }

  const randomCode = Math.floor(100000 + Math.random() * 900000);
  const bookingReference = `NJZ-${randomCode}`;

  let connection: mysql.Connection | null = null;

  try {
    // 1. Connect to Cloud MySQL (TiDB Cloud Serverless)
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 4000),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE || 'nojozi_venue',
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true,
      },
    });

    // 2. Insert booking record into MySQL
    await connection.query(
      `INSERT INTO bookings (
        booking_reference,
        client_name,
        client_email,
        client_phone,
        event_type,
        event_date,
        guest_count,
        catering_tier,
        catering_notes,
        decor_theme,
        selected_extras,
        sound_package,
        special_requests,
        estimated_total,
        payment_status,
        paystack_reference
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        bookingReference,
        clientName.trim(),
        clientEmail.trim(),
        clientPhone.trim(),
        eventType,
        eventDate,
        Number(guestCount),
        cateringTier || 'None',
        cateringNotes || '',
        decorTheme || 'None',
        JSON.stringify(Array.isArray(selectedExtras) ? selectedExtras : []),
        soundPackage || 'None',
        specialRequests.trim(),
        Number(estimatedTotal || 0),
        'unpaid',
        null,
      ]
    );

    // 3. Send dual email alerts via Nodemailer (madixstudio@gmail.com)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_APP_PASSWORD,
      },
    });

    const formattedExtras =
      Array.isArray(selectedExtras) && selectedExtras.length > 0
        ? selectedExtras.join(', ')
        : 'None';

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1d1d1f; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e7; border-radius: 12px;">
        <h2 style="margin-top: 0; color: #111827;">New Venue Booking & Enquiry</h2>
        <p style="font-size: 14px; color: #6e6e73;">Reference: <strong>${bookingReference}</strong></p>
        <hr style="border: none; border-top: 1px solid #e5e5e7; margin: 16px 0;" />
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 6px 0; color: #6e6e73;"><strong>Client Name:</strong></td><td>${clientName}</td></tr>
          <tr><td style="padding: 6px 0; color: #6e6e73;"><strong>Email:</strong></td><td>${clientEmail}</td></tr>
          <tr><td style="padding: 6px 0; color: #6e6e73;"><strong>Phone / WhatsApp:</strong></td><td>${clientPhone}</td></tr>
          <tr><td style="padding: 6px 0; color: #6e6e73;"><strong>Event / Conference Type:</strong></td><td>${eventType}</td></tr>
          <tr><td style="padding: 6px 0; color: #6e6e73;"><strong>Preferred Date:</strong></td><td>${eventDate}</td></tr>
          <tr><td style="padding: 6px 0; color: #6e6e73;"><strong>Guest Count:</strong></td><td>${guestCount}</td></tr>
          <tr><td style="padding: 6px 0; color: #6e6e73;"><strong>Catering Package:</strong></td><td>${cateringTier || 'None'}</td></tr>
          <tr><td style="padding: 6px 0; color: #6e6e73;"><strong>Catering / Halaal Notes:</strong></td><td>${cateringNotes || 'None'}</td></tr>
          <tr><td style="padding: 6px 0; color: #6e6e73;"><strong>Decor Theme:</strong></td><td>${decorTheme || 'None'}</td></tr>
          <tr><td style="padding: 6px 0; color: #6e6e73;"><strong>Sound Package:</strong></td><td>${soundPackage || 'None'}</td></tr>
          <tr><td style="padding: 6px 0; color: #6e6e73;"><strong>Extras:</strong></td><td>${formattedExtras}</td></tr>
          <tr><td style="padding: 6px 0; color: #6e6e73;"><strong>Estimated Total:</strong></td><td><strong>R${Number(estimatedTotal || 0).toLocaleString()}</strong></td></tr>
        </table>
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f7; border-radius: 8px; font-size: 14px;">
          <strong>Enquiry & Special Requests:</strong><br />
          ${specialRequests}
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Nojozi Venue Bookings" <${process.env.SMTP_EMAIL}>`,
      to: 'nojozirestaurant@gmail.com, madixstudio@gmail.com',
      replyTo: clientEmail,
      subject: `[${bookingReference}] New ${eventType} Booking — ${clientName} (${eventDate})`,
      html: emailHtml,
    });

    return res.status(200).json({
      success: true,
      bookingReference,
      message: 'Booking and enquiry saved successfully.',
    });
  } catch (error: any) {
    console.error('Booking submission error:', error);
    return res.status(500).json({
      error: 'Failed to process booking request. Please try again or contact us on WhatsApp.',
      details: error?.message || 'Internal server error',
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
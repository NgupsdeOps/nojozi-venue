import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
  } = req.body;

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
      error: 'Please fill in all required booking and enquiry fields before submitting.',
    });
  }

  const bookingRef = `NJZ-${Date.now().toString().slice(-6)}`;

  try {
    // 1. Save booking to cloud MySQL-compatible database
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 4000),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      ssl: { rejectUnauthorized: false },
    });

    await connection.execute(
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
        estimated_total
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        bookingRef,
        clientName,
        clientEmail,
        clientPhone,
        eventType,
        eventDate,
        Number(guestCount),
        cateringTier || 'None',
        cateringNotes || '',
        decorTheme || 'None',
        JSON.stringify(selectedExtras || []),
        soundPackage || 'None',
        specialRequests,
        Number(estimatedTotal),
      ]
    );

    await connection.end();

    // 2. Send booking notification email to both addresses
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_APP_PASSWORD,
      },
    });

    const extrasText =
      Array.isArray(selectedExtras) && selectedExtras.length > 0
        ? selectedExtras.join(', ')
        : 'None';

    await transporter.sendMail({
      from: `"Nojozi Venue Bookings" <${process.env.SMTP_EMAIL}>`,
      to: 'nojozirestaurant@gmail.com, madixstudio@gmail.com',
      replyTo: clientEmail,
      subject: `Nojozi Venue Booking & Enquiry [${bookingRef}] — ${eventType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1c1917;">
          <h2 style="border-bottom: 2px solid #D99B26; padding-bottom: 8px;">
            New Booking & Enquiry — ${bookingRef}
          </h2>
          <p><strong>Client Name:</strong> ${clientName}</p>
          <p><strong>Email:</strong> ${clientEmail}</p>
          <p><strong>Phone / WhatsApp:</strong> ${clientPhone}</p>
          <hr style="border: 0; border-top: 1px solid #e7e5e4;" />
          <p><strong>Package / Event Type:</strong> ${eventType}</p>
          <p><strong>Event Date:</strong> ${eventDate}</p>
          <p><strong>Guest Count:</strong> ${guestCount}</p>
          <p><strong>Catering Tier:</strong> ${cateringTier || 'None'}</p>
          ${cateringNotes ? `<p><strong>Menu & Dietary Notes:</strong> ${cateringNotes}</p>` : ''}
          <p><strong>Decor Theme:</strong> ${decorTheme || 'None'}</p>
          <p><strong>Sound Package:</strong> ${soundPackage || 'None'}</p>
          <p><strong>Extras & Furniture:</strong> ${extrasText}</p>
          <p><strong>Enquiry / Event Details:</strong> ${specialRequests}</p>
          <h3 style="background: #FAF7F2; padding: 12px; border-left: 4px solid #D99B26;">
            Estimated Total: R ${Number(estimatedTotal).toLocaleString()}
          </h3>
        </div>
      `,
    });

    return res.status(200).json({ success: true, bookingRef });
  } catch (error) {
    console.error('Error saving booking or sending email:', error);
    return res.status(500).json({
      error: 'Unable to save booking right now. Please try again or WhatsApp 069 909 0089.',
    });
  }
}
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

interface Produkt {
  name: string;
  menge: number;
  einheit: string;
  schaelbar: boolean;
}

interface OrderRequest {
  kontakt: {
    vorname: string;
    nachname: string;
    telefon: string;
    abholDatum: string;
    abholZeit: string;
    bemerkungen?: string;
  };
  produkte: Produkt[];
  geschaelt: boolean;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: OrderRequest = await request.json();
    const { kontakt, produkte, geschaelt } = body;

    // Validierung
    if (!kontakt.vorname || !kontakt.nachname || !kontakt.telefon || !kontakt.abholDatum || !kontakt.abholZeit) {
      return new Response(
        JSON.stringify({ error: 'Alle Pflichtfelder müssen ausgefüllt sein.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!produkte || produkte.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Bitte wählen Sie mindestens ein Produkt aus.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Datum formatieren
    const abholDatum = new Date(kontakt.abholDatum).toLocaleDateString('de-DE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Prüfen ob schälbare Produkte bestellt wurden
    const hatSchaelbareProdukte = produkte.some(p => p.schaelbar);

    // Produktliste formatieren
    const produktListe = produkte
      .map(p => `• ${p.name}: ${p.menge} ${p.einheit}`)
      .join('\n');

    // E-Mail HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1F2937; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #7B9E6B, #5A7A4F); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; }
            .content { background: #ffffff; padding: 30px; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 18px; font-weight: 600; color: #7B9E6B; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #7B9E6B; }
            .info-grid { display: grid; gap: 10px; }
            .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #F3F4F6; }
            .info-label { font-weight: 500; min-width: 120px; color: #6B7280; }
            .info-value { color: #1F2937; }
            .products { background: #F9FAFB; padding: 20px; border-radius: 12px; }
            .product-item { padding: 12px 0; border-bottom: 1px solid #E5E7EB; display: flex; justify-content: space-between; }
            .product-item:last-child { border-bottom: none; }
            .product-name { color: #1F2937; }
            .product-qty { font-weight: 600; color: #7B9E6B; }
            .badge { display: inline-block; background: #7B9E6B; color: white; font-size: 12px; padding: 4px 12px; border-radius: 20px; margin-top: 15px; }
            .highlight-box { background: linear-gradient(135deg, #7B9E6B, #5A7A4F); color: white; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0; }
            .highlight-box strong { display: block; font-size: 18px; margin-bottom: 5px; }
            .notes { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; border-radius: 0 8px 8px 0; margin-top: 20px; }
            .notes-title { font-weight: 600; color: #92400E; margin-bottom: 5px; }
            .footer { background: #1F2937; color: white; padding: 25px 30px; text-align: center; }
            .footer p { margin: 5px 0; opacity: 0.8; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌱 Neue Spargelbestellung</h1>
              <p>von ${kontakt.vorname} ${kontakt.nachname}</p>
            </div>
            
            <div class="content">
              <div class="section">
                <div class="section-title">Kundendaten</div>
                <div class="info-grid">
                  <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${kontakt.vorname} ${kontakt.nachname}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Telefon:</span>
                    <span class="info-value"><a href="tel:${kontakt.telefon.replace(/\s/g, '')}">${kontakt.telefon}</a></span>
                  </div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Bestellte Produkte</div>
                <div class="products">
                  ${produkte.map(p => `
                    <div class="product-item">
                      <span class="product-name">${p.name}</span>
                      <span class="product-qty">${p.menge} ${p.einheit}</span>
                    </div>
                  `).join('')}
                  ${hatSchaelbareProdukte ? `
                    <div class="badge">${geschaelt ? '✓ Geschält' : 'Ungeschält'}</div>
                  ` : ''}
                </div>
              </div>

              <div class="highlight-box">
                <strong>📅 Gewünschte Abholung</strong>
                ${abholDatum}<br>
                ${kontakt.abholZeit}
              </div>

              ${kontakt.bemerkungen ? `
                <div class="notes">
                  <div class="notes-title">📝 Bemerkungen des Kunden</div>
                  <p style="margin: 0;">${kontakt.bemerkungen}</p>
                </div>
              ` : ''}
            </div>
            
            <div class="footer">
              <p><strong>Spargelhof Richter GbR</strong></p>
              <p>Warendorfer Str. 40 • 49196 Bad Laer</p>
              <p>Tel: 05424 7734</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
NEUE SPARGELBESTELLUNG - Spargelhof Richter

KUNDENDATEN
-----------
Name: ${kontakt.vorname} ${kontakt.nachname}
Telefon: ${kontakt.telefon}

BESTELLTE PRODUKTE
------------------
${produktListe}
${hatSchaelbareProdukte ? `\nSchäl-Option: ${geschaelt ? 'Geschält' : 'Ungeschält'}` : ''}

GEWÜNSCHTE ABHOLUNG
-------------------
Datum: ${abholDatum}
Uhrzeit: ${kontakt.abholZeit}

${kontakt.bemerkungen ? `BEMERKUNGEN\n-----------\n${kontakt.bemerkungen}` : ''}

---
Spargelhof Richter GbR
Warendorfer Str. 40, 49196 Bad Laer
    `.trim();

    // API Key prüfen
    const apiKey = import.meta.env.RESEND_API_KEY;
    const orderEmail = import.meta.env.ORDER_EMAIL || 'info@spargelhof-richter.de';

    if (!apiKey) {
      // Development mode
      console.log('=== BESTELLUNG EINGEGANGEN (Development Mode) ===');
      console.log(emailText);
      console.log('=================================================');
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Bestellung erfolgreich (Entwicklungsmodus)'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // E-Mail mit Resend senden
    const resend = new Resend(apiKey);
    
    const { data, error } = await resend.emails.send({
      from: 'Spargelhof Richter <bestellung@spargelhof-richter.de>',
      to: [orderEmail],
      subject: `Neue Spargelbestellung von ${kontakt.vorname} ${kontakt.nachname}`,
      html: emailHtml,
      text: emailText
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ error: 'Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Bestellung erfolgreich gesendet',
        id: data?.id 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Order API error:', error);
    return new Response(
      JSON.stringify({ error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

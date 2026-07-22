# Lead Automation Setup — Visionary AI Automations

End-to-end flow:

```
Website (service page)
   ↓  Submit Requirements
Google Form (per service)
   ↓  Auto-populated via response destination
Google Sheet
   ↓  n8n / Make / Zapier trigger
WhatsApp Cloud API
   ↓
Lead notification → +91 94910 71248
```

---

## 1. Create one Google Form per service

Create 5 forms (one per service) with these fields:

| Field           | Type         | Required |
|-----------------|--------------|----------|
| Name            | Short answer | ✅       |
| Business Name   | Short answer | ✅       |
| Phone Number    | Short answer | ✅       |
| Email           | Short answer | ✅       |
| Industry        | Short answer | ✅       |
| Requirements    | Paragraph    | ✅       |
| Budget          | Short answer | ⬜       |
| Timeline        | Short answer | ⬜       |
| Additional Notes| Paragraph    | ⬜       |

**Pre-select the service** by adding a hidden pre-filled field (`Service`) or by using a separate form per service (recommended — cleaner routing).

**Confirmation redirect** (recommended): Google Forms doesn't allow a native redirect. Use the Apps Script trigger below to send a redirect URL back to the user via email, OR simply rely on the "Explore service" / "Submit Requirements" flow — clicking the button opens the form in a new tab while the user can also click the WhatsApp CTA on the current page.

**Better UX (recommended):** wire each form's response destination to a Google Sheet, then use an Apps Script `onFormSubmit` trigger to POST to your n8n webhook (see step 3). The website's `/thank-you` page handles the visitor-facing confirmation when linked with query params: `/thank-you?service=voice-agent&business=Acme&ref=VAI-XXXX`.

Paste the real form URLs into `src/lib/forms.ts`.

---

## 2. Link each Google Form to Google Sheets

In each form:

1. Open the form → **Responses** tab.
2. Click the green Sheets icon → **Create a new spreadsheet**.
3. All responses now stream into a sheet in real time.

---

## 3. n8n workflow — Sheets → WhatsApp Cloud API

Recommended workflow (import into n8n):

```
Google Sheets Trigger (new row)
   ↓
Set → normalize fields (service, name, business, phone, email, industry, requirements, budget, timeline)
   ↓
HTTP Request → WhatsApp Cloud API
   POST https://graph.facebook.com/v20.0/{{PHONE_NUMBER_ID}}/messages
   Header: Authorization: Bearer {{WHATSAPP_TOKEN}}
   Body:
   {
     "messaging_product": "whatsapp",
     "to": "919491071248",
     "type": "text",
     "text": {
       "body": "🔔 NEW WEBSITE LEAD\n\nService: {{service}}\nCustomer: {{name}}\nBusiness: {{business}}\nPhone: {{phone}}\nEmail: {{email}}\nIndustry: {{industry}}\n\nRequirements:\n{{requirements}}\n\nBudget: {{budget}}\nTimeline: {{timeline}}"
     }
   }
```

### Required env vars in n8n

| Variable            | Where to get                                             |
|---------------------|----------------------------------------------------------|
| `WHATSAPP_TOKEN`    | Meta for Developers → WhatsApp → API Setup → Permanent Access Token |
| `PHONE_NUMBER_ID`   | Meta for Developers → WhatsApp → API Setup → Phone number ID |
| `NOTIFY_NUMBER`     | `919491071248`                                           |

### Zapier / Make alternative

- **Trigger:** Google Sheets → New Row
- **Action:** Webhook / HTTP → POST to `https://graph.facebook.com/v20.0/{PHONE_NUMBER_ID}/messages` with the same body.

---

## 4. Analytics — GA4 + Meta Pixel

IDs are configured at runtime via `/settings/analytics`. Events fired automatically:

| Event            | Fired when                              |
|------------------|-----------------------------------------|
| `page_view`      | Every route change                      |
| `service_view`   | Service page mounts                     |
| `whatsapp_click` | Any WhatsApp CTA (with `source` + `service`) |
| `form_click`     | Any "Submit Requirements" click         |
| `form_submit`    | `/thank-you` page mount                 |
| `Lead` (Meta)    | `/thank-you` page mount                 |

---

## 5. Thank-you redirect

To route users through the branded confirmation → WhatsApp handoff, set each Google Form's confirmation message to include a link:

```
Thanks — your request has been received.

👉 Continue on WhatsApp: https://visionaryaiautomations.lovable.app/thank-you?service=voice-agent&business=YourBusiness
```

Replace `service` with the correct key (`ai-automation`, `whatsapp-chatbot`, `voice-agent`, `website`, `video-ads`).

---

## 6. Verify

1. Submit a test entry through each form.
2. Confirm the row lands in the linked Google Sheet.
3. Confirm the WhatsApp lead notification arrives at **+91 94910 71248** within 30 seconds.
4. Open GA4 Realtime + Meta Events Manager and verify `form_submit` / `Lead` fires.
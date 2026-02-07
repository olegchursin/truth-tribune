import type { Slant } from "./types";

type LegalBlock = { title: string; body: string };
type PageContent = { heading: string; subheading: string; sections: LegalBlock[] };

const PRIVACY_LEFT: PageContent = {
  heading: "Privacy Policy",
  subheading: "We promise to peek at your data only with the utmost whimsy.",
  sections: [
    {
      title: "1. The Cookies (the digital kind)",
      body: "We use cookies. Not the kind you dunk in milk—the kind that remember you chose 'Left' so we don't have to ask again. We solemnly swear we will not trade your cookie preferences for a bag of magic beans. Probably.",
    },
    {
      title: "2. What We Collect (and why we're mildly curious)",
      body: "We collect: which button you clicked (Left or Right), that you showed up at all (we're flattered!), and the general vibe of your device. We do not collect: your thoughts, your cat's name, or whether you actually read this. Honest.",
    },
    {
      title: "3. Sharing (we're not that popular)",
      body: "We might share anonymized, aggregated data with: our pet hamster, the void, and absolutely no one who would sell you a timeshare. Your individual choices stay between you and our servers. Pinky promise.",
    },
    {
      title: "4. Your Rights (you're the boss)",
      body: "You may request to know what we know, to forget what we know, or to send us a strongly worded poem. We'll respond within 30 days or send you a postcard from our 'thinking about it' retreat. Either way, you matter.",
    },
  ],
};

const PRIVACY_RIGHT: PageContent = {
  heading: "Privacy Policy",
  subheading: "Your data, your business. We're just happy to be here.",
  sections: [
    {
      title: "1. Cookies (the good kind)",
      body: "We use cookies to remember that you picked 'Right'—because clearly you have excellent taste. We do not sell, barter, or use them as collateral. They're ours, and we're keeping the relationship professional.",
    },
    {
      title: "2. Data We Gather (minimalism is key)",
      body: "We collect: your slant preference (Right. Nice.), basic usage stats, and the fact that you visited. We do not collect: your browsing history elsewhere, your uncle's opinions, or your secret snack stash location. Your secrets are safe.",
    },
    {
      title: "3. Third Parties (almost none)",
      body: "We don't have a Rolodex of data buyers. We might use a boring analytics tool that sees numbers, not faces. No ad networks are peeking over our shoulder. We run a tight, slightly boring ship.",
    },
    {
      title: "4. Your Rights (fully intact)",
      body: "Request access, deletion, or a written summary of what we've got. We'll comply without the drama. You're in control; we're just the friendly neighborhood news tailor. Reach out anytime.",
    },
  ],
};

const TERMS_LEFT: PageContent = {
  heading: "Terms of Use",
  subheading: "By reading this, you've already done more than most. Thank you.",
  sections: [
    {
      title: "1. Welcome, Comrade in Clicks",
      body: "By using Truth Tribune you agree to: have opinions (we gave you two buttons!), be kind to your screen, and not blame us if the news is too spicy or too mild. We're curators, not dictators. Mostly.",
    },
    {
      title: "2. What You Can Do (the fun list)",
      body: "Read. Click. Share. Laugh. Cry. Refresh. Change your mind and come back to pick the other button. We support growth. We do not support: scraping our site with 10,000 bots, impersonating our mascot (there isn't one yet—don't start), or using our name to sell crypto. Just no.",
    },
    {
      title: "3. Our Content (we try)",
      body: "We aggregate and present news with a slant you chose. We don't write the source articles; we just arrange the buffet. If something's wrong, tell us—we'll raise an eyebrow and look into it. No guarantees except good intentions.",
    },
    {
      title: "4. Limitation of Liability (the fine print that isn't mean)",
      body: "We're not liable for: existential crises caused by headlines, coffee spilled while reading, or the sudden urge to fact-check everything. We're a small operation with big dreams. Use us wisely and don't sue us for vibes.",
    },
  ],
};

const TERMS_RIGHT: PageContent = {
  heading: "Terms of Use",
  subheading: "Short, clear, and no surprises. You'll like it here.",
  sections: [
    {
      title: "1. Agreement to Terms",
      body: "Using this site means you accept these terms. You chose 'Right'—we assume you like things straightforward. We provide a personalized news experience; you provide your attention. Fair trade.",
    },
    {
      title: "2. Permitted Use",
      body: "You may: read, share, and enjoy. You may not: automate mass scraping, resell our layout, or use our brand to endorse things we didn't endorse. Keep it legal, keep it civil. We're not asking for much.",
    },
    {
      title: "3. Content Disclaimer",
      body: "We curate from external sources. We don't create the underlying news—we present it according to your preference. Accuracy of third-party content is their responsibility. We aim to deliver a clean, tailored feed; we don't guarantee the universe.",
    },
    {
      title: "4. Limitation of Liability",
      body: "To the extent the law allows: we're not on the hook for indirect damages, lost sleep over headlines, or decisions you make after reading. We're a news aggregator, not your lawyer or therapist. Use responsibly.",
    },
  ],
};

const LEGAL_LEFT: PageContent = {
  heading: "Legal",
  subheading: "The page where we pretend we have a legal department. (We have a very serious hamster.)",
  sections: [
    {
      title: "Disclaimer (the heartfelt one)",
      body: "Truth Tribune is for information and vibes. We're not giving legal, medical, or life advice. If a headline changes your life, great—but maybe also talk to a human. We're flattered, but we're just a website.",
    },
    {
      title: "Intellectual Property (we made this)",
      body: "The layout, the name 'Truth Tribune,' and the sheer audacity of offering two buttons—that's us. The articles and images come from elsewhere and belong to their creators. Don't steal our sparkle; don't steal theirs either.",
    },
    {
      title: "Governing Law (where the hamster lives)",
      body: "We operate from the cloud and possibly a cozy home office. Any disputes shall be resolved by: first, a friendly chat; second, meditation; third, the courts in a jurisdiction we'll figure out when we grow up. For now: be nice.",
    },
    {
      title: "Contact (we're real people)",
      body: "Questions? Compliments? Complaints about the font? Find our contact info on the main site. We read everything. We might not reply to everything, but we read it. Probably while drinking tea.",
    },
  ],
};

const LEGAL_RIGHT: PageContent = {
  heading: "Legal",
  subheading: "Standard legal stuff. We keep it brief so you can get back to the news.",
  sections: [
    {
      title: "Disclaimer",
      body: "Truth Tribune provides aggregated news for personal use. We do not provide legal, financial, or professional advice. Content from third-party sources is their responsibility. Use this site as one input among many.",
    },
    {
      title: "Intellectual Property",
      body: "Our brand, design, and original materials are ours. Third-party articles, images, and content remain the property of their respective rights holders. You may not reproduce our layout or branding for commercial use without permission.",
    },
    {
      title: "Governing Law",
      body: "These terms are governed by the laws of the jurisdiction in which we operate. Any disputes will be resolved in the appropriate courts. We prefer resolution by agreement; litigation is a last resort.",
    },
    {
      title: "Contact",
      body: "For legal inquiries or formal notices, please use the contact information provided elsewhere on this site. We respond to legitimate requests in a timely manner. Spam and unsolicited marketing need not apply.",
    },
  ],
};

const LEGAL_PAGES = {
  privacy: { left: PRIVACY_LEFT, right: PRIVACY_RIGHT },
  terms: { left: TERMS_LEFT, right: TERMS_RIGHT },
  legal: { left: LEGAL_LEFT, right: LEGAL_RIGHT },
} as const;

export function getLegalContent(
  page: keyof typeof LEGAL_PAGES,
  slant: Slant
): PageContent {
  return LEGAL_PAGES[page][slant];
}

// Nutzungsbedingungen (Terms of Service) für alle Apps.
// Erreichbar unter /<lang>/<slug>/terms, z. B. https://neurodiv.dev/en/nalua/terms
// Diese URL wird in der Google Play Console beim Händlerstatus (Trader Status) je App hinterlegt.
//
// Pro App wird festgelegt, welches Bezahlmodell gilt und welche Zusatzabschnitte nötig sind.
// Die Texte selbst stehen unten in `texts` (de/en) und werden für alle Apps gemeinsam gepflegt.

export type Lang = 'en' | 'de';

export interface TermsApp {
  slug: string;
  name: string;
  /** 'premium' = optionaler Einmalkauf schaltet Inhalte frei, 'donation' = alles gratis, freiwillige Spende */
  model: 'premium' | 'donation';
  /** Kurzbeschreibung, was die App ist (ein Satz, ohne Punkt am Ende). */
  what: Record<Lang, string>;
  /** Was im Premium-Kauf enthalten ist (nur bei model 'premium'). */
  premium?: Record<Lang, string>;
  /** Eigene Datenschutzerklärung der App (Pfad ohne Sprachpräfix). Fehlt sie, wird die allgemeine verlinkt. */
  privacyPath?: Record<Lang, string>;
  /** Nutzer:innen können eigene Inhalte (Fotos, Texte) in der App verwenden. */
  userContent?: Record<Lang, string>;
  /** Die App kann Links zum Teilen von Levels erzeugen. */
  shareLinks?: boolean;
  /** Hinweis: kein Medizinprodukt / keine professionelle Beratung. */
  healthNotice?: 'breathing' | 'decisions';
  /** App richtet sich (auch) an Kinder und Familien. */
  family?: boolean;
  /** Käufe in der App sind durch eine Elternsperre geschützt. */
  parentalGate?: boolean;
}

export const termsApps: TermsApp[] = [
  {
    slug: 'calm-color-reveal',
    name: 'Calm Color Reveal',
    model: 'premium',
    what: {
      en: 'a low-stimulation coloring app for children and adults, in which pictures are revealed step by step',
      de: 'eine reizarme Ausmal-App für Kinder und Erwachsene, in der Bilder Schritt für Schritt freigelegt werden',
    },
    premium: {
      en: 'all coloring worlds (including worlds added later), all ways to reveal and an unlimited number of your own photos',
      de: 'alle Ausmal-Welten (auch später hinzukommende), alle Arten des Freilegens und unbegrenzt viele eigene Fotos',
    },
    privacyPath: { en: 'calm-color-reveal/privacy-policy', de: 'calm-color-reveal/datenschutz' },
    userContent: {
      en: 'You can turn your own photos into coloring levels, either from your gallery or taken with the camera. Your photos are processed exclusively on your device and are never uploaded to me or to third parties. Please only use photos that you are allowed to use and that do not violate anyone else\'s rights.',
      de: 'Sie können eigene Fotos als Ausmal-Level verwenden – aus der Galerie oder direkt mit der Kamera aufgenommen. Ihre Fotos werden ausschließlich auf Ihrem Gerät verarbeitet und weder an mich noch an Dritte übertragen. Bitte verwenden Sie nur Fotos, die Sie verwenden dürfen und die keine Rechte anderer verletzen.',
    },
    family: true,
    parentalGate: true,
  },
  {
    slug: 'nalua',
    name: 'nalua',
    model: 'donation',
    what: {
      en: 'a tactile breathing app that guides your breath through vibration patterns, for relaxation and moments of sensory overload',
      de: 'eine spürbare Atem-App, die Ihren Atem über Vibrationsmuster begleitet – zur Entspannung und bei Reizüberflutung',
    },
    privacyPath: { en: 'nalua/privacy-policy', de: 'nalua/datenschutz' },
    healthNotice: 'breathing',
  },
  {
    slug: 'koushi',
    name: 'koushi',
    model: 'premium',
    what: {
      en: 'a minimalist word fill-in puzzle game with level packs and daily puzzles',
      de: 'ein minimalistisches Wort-Gitterrätsel mit Level-Paketen und Tagesrätseln',
    },
    privacyPath: { en: 'koushi/privacy-policy', de: 'koushi/datenschutz' },
    premium: {
      en: 'all current and future level packs and the complete archive of past daily puzzles',
      de: 'alle aktuellen und zukünftigen Level-Pakete sowie das komplette Archiv vergangener Tagesrätsel',
    },
    family: true,
  },
  {
    slug: 'yurua',
    name: 'yurua',
    model: 'donation',
    what: {
      en: 'a calm decision helper that lets you filter options and pick one at random, at your own pace',
      de: 'eine ruhige Entscheidungshilfe, mit der Sie Optionen filtern und zufällig auswählen lassen können – in Ihrem eigenen Tempo',
    },
    privacyPath: { en: 'yurua/privacy-policy', de: 'yurua/datenschutz' },
    userContent: {
      en: 'The options and lists you enter are stored only on your device. They are never transmitted to me or to third parties.',
      de: 'Die Optionen und Listen, die Sie eingeben, werden nur auf Ihrem Gerät gespeichert. Sie werden weder an mich noch an Dritte übertragen.',
    },
    healthNotice: 'decisions',
  },
  {
    slug: '2048',
    name: 'abayo 2048',
    model: 'premium',
    what: {
      en: 'a puzzle game based on the swipe-and-merge principle, with handcrafted levels, obstacles and a classic endless mode',
      de: 'ein Denkspiel nach dem Wisch-und-Verschmelz-Prinzip mit handgebauten Levels, Hindernissen und einem klassischen Endlos-Modus',
    },
    privacyPath: { en: '2048/privacy-policy', de: '2048/datenschutz' },
    premium: {
      en: 'the full campaign, the expert levels in The Lab, the endless Void mode, unlimited undo and redo, the next-tile preview and additional themes',
      de: 'die komplette Kampagne, die Experten-Levels im Lab, den endlosen Void-Modus, unbegrenztes Rückgängig und Wiederholen, die Vorschau auf das nächste Plättchen sowie zusätzliche Themes',
    },
    shareLinks: true,
  },
];

export const termsLastUpdated: Record<Lang, string> = {
  en: 'November 2026',
  de: 'November 2026',
};

export interface TermsSection {
  title: string;
  /** HTML-Absätze bzw. Listen */
  html: string[];
}

export function buildTerms(app: TermsApp, lang: Lang, links: { imprint: string; privacy: string }): TermsSection[] {
  const n = app.name;
  const s: TermsSection[] = [];
  const contact = '<a href="mailto:android-support@neurodiv.dev">android-support@neurodiv.dev</a>';

  if (lang === 'de') {
    s.push({
      title: '1. Geltungsbereich und Anbieter',
      html: [
        `Diese Nutzungsbedingungen gelten für die Nutzung der App <strong>${n}</strong> („die App“) auf Android und iOS. Anbieter der App ist Dennis Hartrampf, neuro / dev, Priorter Dorfstr. 33, 14641 Wustermark, Deutschland („ich“). Weitere Angaben finden Sie im <a href="${links.imprint}">Impressum</a>.`,
        `Zusätzlich gelten die Bedingungen des App-Stores, über den Sie die App beziehen (Google Play bzw. Apple App Store). Bei Widersprüchen zu zwingenden Vorgaben des jeweiligen Stores gehen diese vor.`,
      ],
    });

    s.push({
      title: '2. Die App',
      html: [
        `${n} ist ${app.what.de}. Die App funktioniert ohne Benutzerkonto, enthält keine Werbung und kein Tracking und kann in ihren Kernfunktionen offline genutzt werden.`,
        app.model === 'premium'
          ? `Die App kann kostenlos heruntergeladen werden. Ein Teil der Inhalte ist dauerhaft kostenlos nutzbar; weitere Inhalte können über einen optionalen Einmalkauf freigeschaltet werden (siehe Abschnitt 4).`
          : `Die App und alle ihre Funktionen sind kostenlos. Es gibt keine Abos und keine kostenpflichtigen Funktionen. Optional können Sie die Entwicklung mit einer freiwilligen Spende unterstützen (siehe Abschnitt 4).`,
      ],
    });

    s.push({
      title: '3. Nutzungsrecht',
      html: [
        `Ich räume Ihnen ein einfaches, nicht übertragbares, zeitlich nicht begrenztes Recht ein, die App für private, nicht-kommerzielle Zwecke auf Ihren Geräten zu nutzen, im Rahmen der Regeln des jeweiligen App-Stores (z. B. Familienfreigabe).`,
        `Nicht erlaubt ist es, die App oder ihre Inhalte (z. B. Grafiken, Levels, Texte, Sounds) zu kopieren, zu verbreiten, zu verkaufen, zu verändern oder zu dekompilieren, soweit dies nicht gesetzlich ausdrücklich erlaubt ist. Alle Rechte an der App und ihren Inhalten verbleiben bei mir bzw. den jeweiligen Rechteinhabern.`,
      ],
    });

    if (app.model === 'premium') {
      s.push({
        title: '4. In-App-Kauf (Premium)',
        html: [
          `Mit einem optionalen Einmalkauf schalten Sie ${app.premium!.de} frei. Es handelt sich um einen einmaligen Kauf, nicht um ein Abonnement. Es gibt keine In-App-Währungen und keine Verbrauchsgüter.`,
          `Der aktuelle Preis wird vor dem Kauf im App-Store angezeigt. Bezahlung und Abwicklung erfolgen ausschließlich über Google Play bzw. den Apple App Store; ich erhalte keine Zahlungsdaten. Der Kauf ist an Ihr Store-Konto gebunden und kann auf weiteren Geräten mit demselben Konto über die Funktion „Käufe wiederherstellen“ bzw. automatisch wiederhergestellt werden.`,
          `„Zukünftige“ Inhalte bedeutet: Inhalte, die ich später der App hinzufüge, sind ohne weiteren Kauf enthalten. Ein Anspruch auf die Veröffentlichung neuer Inhalte besteht nicht.`,
          `Für Erstattungen gelten die Richtlinien des jeweiligen App-Stores. Ihre gesetzlichen Rechte, insbesondere Gewährleistungsrechte, bleiben unberührt.`,
        ],
      });
    } else {
      s.push({
        title: '4. Freiwillige Spenden',
        html: [
          `In der App können Sie die Entwicklung mit einer freiwilligen Spende („Zahl, was du willst“) unterstützen. Eine Spende ist ein In-App-Kauf über Google Play bzw. den Apple App Store. Sie schaltet keine zusätzlichen Funktionen frei – alle Funktionen bleiben auch ohne Spende vollständig nutzbar.`,
          `Bezahlung und Abwicklung erfolgen ausschließlich über den jeweiligen App-Store; ich erhalte keine Zahlungsdaten. Für Erstattungen gelten die Richtlinien des jeweiligen App-Stores.`,
        ],
      });
    }

    s.push({
      title: '5. Widerrufsrecht',
      html: [
        `Wenn Sie Verbraucher:in in der EU sind, steht Ihnen bei Käufen digitaler Inhalte grundsätzlich ein gesetzliches Widerrufsrecht von 14 Tagen zu. Dieses erlischt vorzeitig, wenn die Bereitstellung des digitalen Inhalts mit Ihrer ausdrücklichen Zustimmung und Ihrer Bestätigung, dass Sie dadurch Ihr Widerrufsrecht verlieren, vor Ablauf der Frist beginnt (§ 356 Abs. 5 BGB). Großzügigere Erstattungsregeln des jeweiligen App-Stores bleiben unberührt.`,
      ],
    });

    let i = 6;
    if (app.userContent || app.shareLinks) {
      const html: string[] = [];
      if (app.userContent) html.push(app.userContent.de);
      if (app.shareLinks) {
        html.push(`Sie können Levels als Link mit anderen teilen. Ein solcher Link enthält nur die Level-Daten (Aufbau und Zufallswerte) und, falls Sie einen eingeben, einen kurzen selbst gewählten Namen. Sie entscheiden selbst, mit wem Sie einen Link teilen; das Teilen erfolgt über die Apps Ihres Geräts (z. B. Messenger) und unterliegt deren Bedingungen.`);
      }
      s.push({ title: `${i++}. Ihre Inhalte`, html });
    }

    if (app.healthNotice === 'breathing') {
      s.push({
        title: `${i++}. Gesundheitlicher Hinweis`,
        html: [
          `${n} ist ein Hilfsmittel zur Entspannung und Selbstregulation. Die App ist <strong>kein Medizinprodukt</strong> und ersetzt keine ärztliche, psychotherapeutische oder sonstige professionelle Diagnose, Beratung oder Behandlung.`,
          `Hören Sie auf Ihren Körper. Wenn Sie sich bei einer Übung unwohl, schwindelig oder kurzatmig fühlen, brechen Sie sie ab und atmen Sie normal weiter. Wenn Sie eine Atemwegs-, Herz-Kreislauf- oder andere Erkrankung haben oder schwanger sind, sprechen Sie im Zweifel vorher mit Ihrer Ärztin oder Ihrem Arzt. Nutzen Sie die App nicht beim Autofahren oder in anderen Situationen, die Ihre volle Aufmerksamkeit erfordern.`,
        ],
      });
    }
    if (app.healthNotice === 'decisions') {
      s.push({
        title: `${i++}. Hinweis zu Entscheidungen`,
        html: [
          `${n} hilft Ihnen, Optionen zu sortieren und bei Bedarf zufällig eine auszuwählen. Die App gibt keine Empfehlungen und ersetzt keine medizinische, psychologische, rechtliche, finanzielle oder sonstige professionelle Beratung. Die Verantwortung für Ihre Entscheidungen liegt bei Ihnen. Bitte nutzen Sie die App nicht für Entscheidungen, bei denen Ihre Gesundheit, Sicherheit oder die anderer Menschen auf dem Spiel steht.`,
        ],
      });
    }
    if (app.family) {
      s.push({
        title: `${i++}. Kinder und Familien`,
        html: [
          `Die App ist auch für Kinder geeignet. Wenn Kinder die App nutzen, sind die Eltern bzw. Erziehungsberechtigten für die Nutzung verantwortlich. ${app.parentalGate ? 'Käufe sind in der App durch eine Elternsperre geschützt; zusätzlich empfehle ich' : 'Ich empfehle'}, in den Einstellungen des App-Stores eine Bestätigung für Käufe zu aktivieren.`,
        ],
      });
    }

    s.push({
      title: `${i++}. Verfügbarkeit, Updates und Ihre Daten`,
      html: [
        `Ich entwickle die App laufend weiter und kann Funktionen und Inhalte durch Updates anpassen, solange bereits gekaufte Inhalte dadurch nicht wesentlich beeinträchtigt werden. Einen Anspruch auf bestimmte neue Funktionen gibt es nicht. Für die Nutzung kann eine aktuelle Version der App und des Betriebssystems erforderlich sein.`,
        `Ihr Fortschritt und Ihre Einstellungen werden nur lokal auf Ihrem Gerät gespeichert. Wenn Sie die App deinstallieren, die App-Daten löschen oder das Gerät wechseln, können diese Daten verloren gehen, soweit sie nicht von einer Sicherung Ihres Betriebssystems erfasst werden. ${app.model === 'premium' ? 'Gekaufte Inhalte bleiben an Ihr Store-Konto gebunden und können wiederhergestellt werden.' : ''}`.trim(),
      ],
    });

    s.push({
      title: `${i++}. Haftung`,
      html: [
        `Ich hafte unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei Verletzung von Leben, Körper oder Gesundheit, nach dem Produkthaftungsgesetz sowie im Umfang einer übernommenen Garantie.`,
        `Bei leichter Fahrlässigkeit hafte ich nur bei Verletzung einer wesentlichen Vertragspflicht (einer Pflicht, deren Erfüllung die ordnungsgemäße Nutzung der App überhaupt erst ermöglicht und auf deren Einhaltung Sie regelmäßig vertrauen dürfen), begrenzt auf den vorhersehbaren, typischerweise eintretenden Schaden. Für kostenlos bereitgestellte Funktionen hafte ich im Übrigen nur bei Vorsatz und grober Fahrlässigkeit.`,
        `Ihre gesetzlichen Gewährleistungsrechte bleiben unberührt.`,
      ],
    });

    s.push({
      title: `${i++}. Datenschutz`,
      html: [
        `Wie mit Daten umgegangen wird, erfahren Sie in der <a href="${links.privacy}">Datenschutzerklärung</a>.`,
      ],
    });

    s.push({
      title: `${i++}. Änderungen dieser Bedingungen`,
      html: [
        `Ich kann diese Nutzungsbedingungen anpassen, etwa wenn sich die App, die Rechtslage oder die Vorgaben der App-Stores ändern. Die jeweils aktuelle Fassung finden Sie auf dieser Seite. Änderungen, die Sie wesentlich benachteiligen, gelten nicht rückwirkend für bereits getätigte Käufe.`,
      ],
    });

    s.push({
      title: `${i++}. Anwendbares Recht und Streitbeilegung`,
      html: [
        `Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Wenn Sie Verbraucher:in sind, gilt diese Rechtswahl nur, soweit Ihnen dadurch nicht der Schutz zwingender Vorschriften des Staates entzogen wird, in dem Sie Ihren gewöhnlichen Aufenthalt haben.`,
        `Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Bei Problemen schreiben Sie mir aber gerne – ich finde fast immer eine Lösung.`,
        `Sollte eine Bestimmung dieser Bedingungen unwirksam sein, bleiben die übrigen Bestimmungen wirksam.`,
      ],
    });

    s.push({
      title: `${i++}. Kontakt`,
      html: [`Bei Fragen zu diesen Nutzungsbedingungen oder zur App erreichen Sie mich unter:`, contact],
    });
    return s;
  }

  // ---------- English ----------
  s.push({
    title: '1. Scope and Provider',
    html: [
      `These Terms of Service apply to your use of the app <strong>${n}</strong> ("the App") on Android and iOS. The App is provided by Dennis Hartrampf, neuro / dev, Priorter Dorfstr. 33, 14641 Wustermark, Germany ("I", "me"). Further details are available in the <a href="${links.imprint}">legal notice</a>.`,
      `In addition, the terms of the app store through which you obtain the App (Google Play or the Apple App Store) apply. Where these terms conflict with mandatory requirements of the respective store, the store's requirements take precedence.`,
    ],
  });

  s.push({
    title: '2. The App',
    html: [
      `${n} is ${app.what.en}. The App works without a user account, contains no ads and no tracking, and its core features can be used offline.`,
      app.model === 'premium'
        ? `The App is free to download. Part of the content is free to use forever; additional content can be unlocked with an optional one-time purchase (see section 4).`
        : `The App and all of its features are free. There are no subscriptions and no paid features. If you like, you can support development with a voluntary donation (see section 4).`,
    ],
  });

  s.push({
    title: '3. License',
    html: [
      `I grant you a non-exclusive, non-transferable, perpetual right to use the App on your devices for personal, non-commercial purposes, within the rules of the respective app store (e.g. family sharing).`,
      `You may not copy, distribute, sell, modify or decompile the App or its content (e.g. graphics, levels, texts, sounds), except where expressly permitted by law. All rights in the App and its content remain with me or the respective rights holders.`,
    ],
  });

  if (app.model === 'premium') {
    s.push({
      title: '4. In-App Purchase (Premium)',
      html: [
        `An optional one-time purchase unlocks ${app.premium!.en}. This is a single purchase, not a subscription. There are no in-app currencies and no consumable items.`,
        `The current price is shown in the app store before you buy. Payment and processing are handled exclusively by Google Play or the Apple App Store; I never receive your payment details. The purchase is tied to your store account and can be restored on other devices using the same account, either automatically or via "Restore purchases".`,
        `"Future" content means that content I add to the App later is included without an additional purchase. There is no entitlement to the release of new content.`,
        `Refunds are governed by the policies of the respective app store. Your statutory rights, in particular warranty rights, remain unaffected.`,
      ],
    });
  } else {
    s.push({
      title: '4. Voluntary Donations',
      html: [
        `Inside the App you can support development with a voluntary "pay what you want" donation. A donation is an in-app purchase through Google Play or the Apple App Store. It does not unlock any additional features – all features remain fully available without a donation.`,
        `Payment and processing are handled exclusively by the respective app store; I never receive your payment details. Refunds are governed by the policies of the respective app store.`,
      ],
    });
  }

  s.push({
    title: '5. Right of Withdrawal',
    html: [
      `If you are a consumer in the EU, you generally have a statutory 14-day right of withdrawal for purchases of digital content. This right expires early if the supply of the digital content begins before the end of the withdrawal period with your express consent and your acknowledgment that you thereby lose your right of withdrawal. More generous refund policies of the respective app store remain unaffected.`,
    ],
  });

  let i = 6;
  if (app.userContent || app.shareLinks) {
    const html: string[] = [];
    if (app.userContent) html.push(app.userContent.en);
    if (app.shareLinks) {
      html.push(`You can share levels with others as a link. Such a link contains only the level data (layout and random values) and, if you enter one, a short name of your choice. You decide who you share a link with; sharing takes place via the apps on your device (e.g. messengers) and is subject to their terms.`);
    }
    s.push({ title: `${i++}. Your Content`, html });
  }

  if (app.healthNotice === 'breathing') {
    s.push({
      title: `${i++}. Health Notice`,
      html: [
        `${n} is a tool for relaxation and self-regulation. The App is <strong>not a medical device</strong> and does not replace medical, psychotherapeutic or any other professional diagnosis, advice or treatment.`,
        `Listen to your body. If you feel uncomfortable, dizzy or short of breath during an exercise, stop and return to your normal breathing. If you have a respiratory, cardiovascular or other medical condition, or are pregnant, please consult your doctor first if in doubt. Do not use the App while driving or in other situations that require your full attention.`,
      ],
    });
  }
  if (app.healthNotice === 'decisions') {
    s.push({
      title: `${i++}. Note on Decisions`,
      html: [
        `${n} helps you sort options and, if you like, pick one at random. The App does not give recommendations and does not replace medical, psychological, legal, financial or any other professional advice. You remain responsible for your decisions. Please do not use the App for decisions affecting your health or safety or that of other people.`,
      ],
    });
  }
  if (app.family) {
    s.push({
      title: `${i++}. Children and Families`,
      html: [
        `The App is suitable for children. When children use the App, their parents or legal guardians are responsible for that use. ${app.parentalGate ? 'Purchases inside the App are protected by a parental gate; I also recommend' : 'I recommend'} enabling purchase authentication in your app store settings.`,
      ],
    });
  }

  s.push({
    title: `${i++}. Availability, Updates and Your Data`,
    html: [
      `I continuously develop the App and may adjust features and content through updates, as long as content you have already purchased is not materially impaired. There is no entitlement to specific new features. Using the App may require an up-to-date version of the App and your operating system.`,
      `Your progress and settings are stored only locally on your device. If you uninstall the App, clear its data or switch devices, this data may be lost unless it is included in a backup made by your operating system. ${app.model === 'premium' ? 'Purchased content remains tied to your store account and can be restored.' : ''}`.trim(),
    ],
  });

  s.push({
    title: `${i++}. Liability`,
    html: [
      `I am liable without limitation for intent and gross negligence, for injury to life, body or health, under the German Product Liability Act, and to the extent of any guarantee given.`,
      `In cases of slight negligence, I am liable only for breach of an essential contractual obligation (an obligation whose fulfillment makes the proper use of the App possible in the first place and on whose fulfillment you may regularly rely), limited to the foreseeable damage typical for this type of contract. For features provided free of charge, I am otherwise liable only for intent and gross negligence.`,
      `Your statutory warranty rights remain unaffected.`,
    ],
  });

  s.push({
    title: `${i++}. Privacy`,
    html: [`Information on how data is handled can be found in the <a href="${links.privacy}">privacy policy</a>.`],
  });

  s.push({
    title: `${i++}. Changes to These Terms`,
    html: [
      `I may update these Terms of Service, for example if the App, the legal situation or app store requirements change. The current version is always available on this page. Changes that materially disadvantage you do not apply retroactively to purchases already made.`,
    ],
  });

  s.push({
    title: `${i++}. Governing Law and Disputes`,
    html: [
      `These terms are governed by the laws of the Federal Republic of Germany, excluding the UN Convention on Contracts for the International Sale of Goods (CISG). If you are a consumer, this choice of law applies only insofar as it does not deprive you of the protection of mandatory provisions of the country in which you have your habitual residence.`,
      `I am not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board. If you have a problem, please just write to me – I can almost always find a solution.`,
      `If any provision of these terms is invalid, the remaining provisions remain in effect.`,
    ],
  });

  s.push({
    title: `${i++}. Contact`,
    html: [`If you have any questions about these Terms of Service or the App, you can reach me at:`, contact],
  });
  return s;
}

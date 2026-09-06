import type {
  FaqRecord,
  PublicPrayerRequestRecord,
  PublicMissionaryRecord,
  PublicNewsRecord,
  ResourceRecord,
} from "@/lib/directus/schema";

/**
 * Last-known-good public CMS snapshot for cold builds and cold starts.
 * Refresh intentionally from published Directus content after editorial changes.
 *
 * Annotated, not "satisfies" — an empty array in the live data (e.g. no prayer requests inside the
 * freshness window) would otherwise infer as never[] from the literal and break every caller.
 */
export const CONTENT_SNAPSHOT: {
  news: PublicNewsRecord[];
  missionaries: PublicMissionaryRecord[];
  prayerRequests: PublicPrayerRequestRecord[];
  resources: ResourceRecord[];
  faqs: FaqRecord[];
} = {
  "news": [
    {
      "id": "6abe5ceb-a39c-477d-958f-3414d1e67d90",
      "status": "published",
      "category": "story",
      "slug": "marakwet-community-receives-full-bible",
      "title": "A Long-Awaited Gift: The Marakwet Community Receives the Full Bible",
      "excerpt": "After more than four decades of translation work, the Marakwet community gathered at Tot Primary School on 1 August 2026 to dedicate the complete Bible in their own language — the answer to a prayer first voiced when only the New Testament arrived in 2009.",
      "body": [
        "For years, the Marakwet church celebrated one remarkable gift. The New Testament in the language of their hearts. It transformed worship, deepened discipleship, and opened God's Word to many in a deeply personal way. Yet even in celebration, one prayer remained.",
        "\"We now have half a beehive,\" church leaders said after the New Testament was dedicated in 2009. \"Help us receive the whole beehive.\"",
        "In Marakwet culture, a beehive is a symbol of abundance and sweetness. For the church, it became a picture of something even greater. The New Testament had nourished their faith, but they longed for the richness of the entire counsel of God.",
        "That prayer was answered on 1 August 2026, when the Marakwet community gathered at Tot Primary School to dedicate the complete Bible in the Marakwet language. It was more than the launch of a book. It was the celebration of a journey marked by faith, perseverance, and God's faithfulness over more than four decades.",
        "The journey began in 1983, when Bible Translation and Literacy (BTL) initiated language development, Bible translation, and literacy work among the Endo–Marakwet people, who number about 120,000.",
        "Like many Bible translation journeys, the road was not without challenges. Periods of insecurity in the region disrupted the work, requiring the translation team to temporarily relocate to Eldoret while they waited for stability to return. Even then, the vision never faded. When peace was restored, the translators returned with renewed determination, continuing the work that would eventually place the Scriptures into the hands of their own community.",
        "Their perseverance bore fruit in 2009 with the dedication of the Marakwet New Testament. Three years later, inspired by the church's heartfelt appeal for \"the whole beehive,\" work on translating the Old Testament began. Fourteen years later, that vision has become reality.",
        "For Wycliffe Africa Director Emeritus Edwyn Kiptinness, this milestone is deeply personal.",
        "Long before the Marakwet Bible became a reality, a young boy lay in a hospital bed recovering from a devastating leg injury. During the ten months he spent there, two missionaries placed a Nandi Bible in his hands. He read it eagerly, but because it was not in his own language, much of it remained difficult to understand.",
        "That experience planted a conviction that would shape the rest of his life: every community deserves the opportunity to encounter God's Word in the language they understand best.",
        "As a Marakwet speaker, Kiptinness became one of the strongest advocates for translating the Bible into Marakwet. The proposal initially faced resistance, with concerns that recognizing Marakwet separately might divide the wider Kalenjin community. Still, he remained convinced that making Scripture accessible in people's heart language was worth pursuing. His persistence helped pave the way for the project, and he even donated family land to support the translation work.",
        "Today, the dedication of the complete Marakwet Bible stands as a testimony to what God can accomplish through faithful partnership, patient perseverance, and a community that refused to stop praying.",
        "Somewhere in Marakwet today, a child will hear the story of creation in the language spoken at home. A family will read from Genesis together for the first time in their mother tongue. A pastor will preach from both the Old and New Testaments without leaving the language of the people before him.",
        "That is the true significance of this milestone.",
        "The Marakwet Bible is more than a completed translation. It is an answered prayer, a legacy of faithful partnership, and an invitation for generations to encounter God through His Word in the language of their hearts."
      ],
      "author": "Wycliffe Africa",
      "missionaryId": null,
      "place": "Marakwet, Kenya",
      "journey": "stories",
      "tagLabel": "Bible dedication",
      "date": "1 August 2026",
      "image": "a923201c-a589-4242-96e8-e4b1df2d0dce",
      "pullQuote": "\"We now have half a beehive,\" church leaders said after the New Testament was dedicated in 2009. \"Help us receive the whole beehive.\"",
      "inlineImage": "759a68f4-80b3-4eff-bfd7-6fee295af7ed",
      "inlineImageCaption": null
    },
    {
      "id": "2d607d56-1fc8-4867-81b8-ea245ffd95ae",
      "status": "published",
      "category": "update",
      "slug": "living-the-good-news-through-everyday-life",
      "title": "Living the Good News Through Everyday Life",
      "excerpt": "Whether in a workplace or a children's Bible club, missionary Lilian Barah continues to share the love of Christ by helping people discover what it means to live out the Gospel every day.",
      "body": [
        "Whether in a workplace or a children's Bible club, missionary Lilian Barah continues to share the love of Christ by helping people discover what it means to live out the Gospel every day.",
        "Lilian serves through discipleship, trauma healing, mentoring, and practical skills development. She has a special passion for children and young women, walking alongside them as they grow spiritually and practically through Bible study, sewing, and life-skills training.",
        "After recently completing her school term, Lilian was warmly welcomed back by the women she mentors. They were eager for her to resume leading their Bible lessons — a reminder of the meaningful relationships she has built through consistent discipleship.",
        "In her latest women's fellowship, Lilian taught on \"Living the Good News Through Empathy in Our Workplace.\" As the discussion unfolded, many women reflected honestly on their experiences at work and in business. The lesson challenged them to treat customers and colleagues with greater compassion, recognizing that their workplaces are also mission fields where they can demonstrate the love of Christ.",
        "\"The women openly shared their experiences,\" Lilian says. \"Many appreciated the lesson and admitted there were times they had not treated others well. We desire to use our workplaces to share the Good News and reach those who may never hear it otherwise.\"",
        "Lilian also continued her children's Bible Club, even though attendance was smaller because many children were away on holiday. Together they explored the theme \"God Created Me,\" based on Psalm 139:14: \"I praise You because I am fearfully and wonderfully made.\"",
        "Through stories, questions, and lively discussions, the children learned that every person is created in God's image and deeply valued by Him. While none of the children made a decision to follow Christ during the session, Lilian remains encouraged by their growing understanding and continues to pray that the seeds planted in their hearts will bear lasting fruit.",
        "As Lilian faithfully serves through teaching, mentoring, and discipleship, lives are being shaped one lesson, one conversation, and one child at a time."
      ],
      "author": "Lilian Barah",
      "missionaryId": "barah",
      "place": "Yaoundé, Cameroon",
      "journey": null,
      "tagLabel": null,
      "date": "August 2026",
      "image": "443ea694-a0bf-493c-9637-54eaf5dbffc1",
      "pullQuote": " \"I praise You because I am fearfully and wonderfully made.\" Psalm 139:14",
      "inlineImage": "e7060927-4e02-44de-b776-cfa577511f8d",
      "inlineImageCaption": null
    },
    {
      "id": "01b42524-8aa4-46ed-984a-ab0d6bdf5419",
      "status": "published",
      "category": "story",
      "slug": "why",
      "title": "2,000+ languages still wait for Scripture",
      "excerpt": "Across Africa, millions have never read a single verse in the language they think, pray and dream in. Bible translation closes that gap. ",
      "body": [
        "Across Africa, millions have never read a single verse in the language they think, pray and dream in. Bible translation closes that gap.",
        "For years, prayers, songs and Sunday readings came in a language learned at school — never the one spoken at home. That distance is what Bible translation closes: not merely swapping words, but letting the living Word be heard in the tongue of the heart."
      ],
      "author": "Wycliffe Africa",
      "missionaryId": null,
      "place": "Continental",
      "journey": "give",
      "tagLabel": "Why translation",
      "date": "2026",
      "image": null,
      "pullQuote": null,
      "inlineImage": null,
      "inlineImageCaption": null
    }
  ],
  "missionaries": [
    {
      "id": "a7bec3b7-3e6c-4430-8db3-add343666d46",
      "slug": "cornel-sharon-aora",
      "name": "Cornel & Sharon Aora",
      "place": "Nairobi, Kenya",
      "roles": "Resource Mobilization, Partnerships and Communication, and Children's Ministry",
      "intro": "Cornel joined Wycliffe Africa after serving for nearly ten years with Bible Translation & Literacy (BTL) East Africa, where he worked alongside churches, schools, partners and communities to advance Bible translation and literacy.",
      "image": "3b6c4797-84e0-4ca2-ba03-3c6e924f7fd0",
      "familyImage": "3b6c4797-84e0-4ca2-ba03-3c6e924f7fd0",
      "familyCaption": "Together, we can help make it possible for more people across Africa to encounter God through His Word.",
      "pullQuote": null,
      "bio": "Cornel and Sharon Aora serve with Wycliffe Africa, together with their children, Ellah and Taraji. Cornel joined Wycliffe Africa after serving for nearly ten years with Bible Translation & Literacy (BTL) East Africa, where he worked alongside churches, schools, partners and communities to advance Bible translation and literacy.\n\nDuring his years at BTL, Cornel developed a deep appreciation for the important role that partnerships, resource mobilization and communication play in making Bible translation possible. He saw how churches, individuals, schools and other partners could come together to support a mission greater than themselves and help make God's Word accessible to people and communities.\n\nToday, Cornel serves with Wycliffe Africa, supporting Resource Mobilization, Partnerships and Communication. Through this role, he works to help mobilize people, resources, relationships and prayer in support of Bible translation and related ministries across Africa.\n\nCornel and Sharon believe that every person deserves the opportunity to encounter God through His Word. Across Africa, many communities are still waiting for Scripture in languages they understand and speak from the heart. They believe that every language matters because every person matters to God.\nSharon has also served faithfully in children's ministry through Uncle Paul's Ark. As their family continues this new chapter of service, she joins Cornel in embracing the opportunities and sacrifices that come with responding to God's calling together as a family.\n\nTheir children, Ellah and Taraji, are an important part of this journey. The Aoras recognize that ministry is not only about the work done in offices, churches, conferences or communities, but also about the prayers, sacrifices and faith shared within a family.\n\nGod calls men and women to serve Him in different ways. He may also be calling you to play a special role in the Aora family's ministry. They invite friends, churches and partners to prayerfully consider walking with them through prayer, encouragement, relationships and financial support.\n\nTogether, we can help make it possible for more people across Africa to encounter God through His Word.\n\n",
      "email": null
    },
    {
      "id": "mwangi",
      "slug": "david-mwangi",
      "name": "David Mwangi",
      "place": "South Sudan",
      "roles": "Scripture Engagement",
      "intro": "David helps churches put translated Scripture to use in worship, discipleship and daily life — through song, audio and Bible study.",
      "image": null,
      "familyImage": null,
      "familyCaption": null,
      "pullQuote": null,
      "bio": "David's conviction is simple: translation is finished not when the books are printed, but when people meet God in them. He serves churches in South Sudan as a Scripture engagement facilitator.\n\nHis weeks are spent helping congregations weave newly translated Scripture into worship — recording Scripture songs with local choirs, distributing audio Bibles for listening groups, and training pastors to preach from the mother-tongue text.",
      "email": null
    },
    {
      "id": "achieng",
      "slug": "esther-achieng",
      "name": "Esther Achieng",
      "place": "Uganda",
      "roles": "Language Survey Specialist",
      "intro": "Esther travels across language areas gathering the data that guides where translation work is needed most.",
      "image": null,
      "familyImage": null,
      "familyCaption": null,
      "pullQuote": null,
      "bio": "Before a single verse can be drafted, someone has to listen. Esther leads survey trips across Uganda's language areas — recording word lists, testing comprehension between dialects, and sitting with elders to understand how communities actually speak.\n\nHer reports guide where the movement begins its next translation projects, making her work the first chapter of every future Scripture launch.",
      "email": null
    },
    {
      "id": "barah",
      "slug": "frans-lilian-barah",
      "name": "Frans & Lilian Barah",
      "place": "Yaoundé, Cameroon",
      "roles": "Language Technology Consultant & Discipleship Ministry",
      "intro": "Frans and Lilian are Cameroonian missionaries who have served together for more than two decades in Bible translation, church ministry, leadership development, and community transformation.",
      "image": "c1bc0970-76d9-40ee-9cde-df351007bff6",
      "familyImage": null,
      "familyCaption": null,
      "pullQuote": null,
      "bio": "Frans serves as a Language Technology Consultant and Associate Domain Team Leader for Language Technology in the SIL Africa Area. He trains, mentors, and supports Bible translation teams across Africa in using technology for translation, literacy, and the production of printed and digital Scripture resources. He is especially passionate about developing African leaders and building sustainable local capacity.\n\nLilian serves through discipleship, trauma healing, mentoring, and practical skills development. She has a special passion for children and young women, helping them grow spiritually and practically through Bible study, sewing, and life-skills training.\n\nFor more than two decades, Frans and Lilian have served together in Bible translation, church ministry, leadership development, and community transformation. Their calling: to know Christ and make Him known by equipping others and helping communities experience the transforming power of God's Word.",
      "email": "frans_barah@wycliffeafrica.org"
    },
    {
      "id": "kamau",
      "slug": "joseph-kamau",
      "name": "Joseph Kamau",
      "place": "Nairobi, Kenya",
      "roles": "Finance & Administration",
      "intro": "Joseph stewards the funds entrusted to the movement, ensuring every gift is accounted for and directed to the field.",
      "image": null,
      "familyImage": null,
      "familyCaption": null,
      "pullQuote": null,
      "bio": "Every translation project runs on trust — of language communities, of churches, and of the givers who fund the work. Joseph keeps that trust: he manages the movement's accounts from Nairobi, ensuring every gift is tracked from donor to field.\n\nA certified accountant, he left corporate practice in 2018 because he wanted his ledgers to count for something eternal.",
      "email": null
    },
    {
      "id": "teera",
      "slug": "lydia-teera",
      "name": "Lydia Teera",
      "place": "Uganda",
      "roles": "Programme Manager, Learning & Development – SIL Africa",
      "intro": "Lydia champions language-inclusive education and Scripture engagement across Uganda, helping refugee and host communities access learning and God’s Word in the languages they understand best.",
      "image": "c1954f5b-d382-439a-9ba2-8f35196cd149",
      "familyImage": null,
      "familyCaption": null,
      "pullQuote": null,
      "bio": "Lydia Teera is a Ugandan mission leader and Programme Manager serving with the Learning & Development team at SIL Africa while seconded from Wycliffe Africa. With more than two decades of missionary service, Lydia is passionate about helping communities access education and Scripture in languages they understand best. Her work focuses on advocacy, alliance building, and strengthening partnerships that promote language-inclusive education and meaningful Scripture engagement across African communities.\n\nIn her current role, Lydia contributes to initiatives that address language barriers in education, particularly among refugee and host communities in Uganda. She has co-led evidence-based programs that equip educators with multilingual classroom strategies and practical approaches that governments and institutions can adopt in their education systems. Her work brings together research, training, and community engagement to ensure that language becomes a bridge—rather than a barrier—to learning, faith formation, and community transformation.\n\nLydia’s calling to missionary service began more than 20 years ago when she made the courageous decision to dedicate her life to advancing God’s mission through Bible translation and language development. Known for her strengths in advocacy, communication, and partnership building, she is also a co-author of a bridging program that supports refugee learners transitioning into Ugandan schools. Beyond her professional work, Lydia enjoys meaningful conversations around Scripture and the role of language in shaping identity and faith. She also loves sharing stories that highlight the impact of Bible translation and education initiatives, and when she is at home, she enjoys spending time in her garden.\n\nAmong the many language communities she has worked with, Lydia holds a special place in her heart for the Pokot, a marginalised tribe in northeastern Uganda facing low literacy, limited access to basic resources, and an undiscipled church shaped by language barriers and remote geography. She has dedicated significant time to supporting their language development. She is also a key contributor to Wycliffe Africa’s partnership with other mission organisations to recruit and send African missionaries into Bible translation work worldwide, having helped recruit several missionaries serving in Uganda.",
      "email": "lydia_teera@wycliffeafrica.org"
    },
    {
      "id": "wanjiru",
      "slug": "miriam-wanjiru",
      "name": "Miriam Wanjiru",
      "place": "Nairobi, Kenya",
      "roles": "Literacy Specialist",
      "intro": "Miriam develops reading primers and adult literacy programmes so that when Scripture arrives, communities can read it for themselves.",
      "image": null,
      "familyImage": null,
      "familyCaption": null,
      "pullQuote": null,
      "bio": "A translated Bible no one can read stays closed. Miriam joined the movement after a decade teaching primary school, convinced that literacy is the bridge between a finished translation and a transformed community.\n\nFrom Nairobi she designs reading primers, trains volunteer literacy teachers, and runs adult reading groups in partner language areas — most recently in the Kakuma refugee settlement.",
      "email": null
    },
    {
      "id": "njoroge",
      "slug": "peter-hannah-njoroge",
      "name": "Peter & Hannah Njoroge",
      "place": "Cameroon",
      "roles": "Bible Translation Advisors",
      "intro": "Peter and Hannah serve a cluster of related languages, training local translators and checking drafts with consultants.",
      "image": null,
      "familyImage": null,
      "familyCaption": null,
      "pullQuote": null,
      "bio": "Peter and Hannah moved to Cameroon in 2019 to serve a cluster of four related languages in the Northwest. Rather than translating themselves, they train and mentor local translation teams — one team per language, sharing tools, terminology and checked drafts across the cluster.\n\nTheir joy is watching a community leader read a freshly checked chapter aloud and hearing the room answer back in recognition.",
      "email": null
    },
    {
      "id": "otieno",
      "slug": "samuel-grace-otieno",
      "name": "Samuel & Grace Otieno",
      "place": "Turkana, Kenya",
      "roles": "Translation Team Advisors",
      "intro": "Samuel and Grace walk alongside mother-tongue translators drafting the New Testament, checking each book with the community until it reads clearly and naturally.",
      "image": null,
      "familyImage": null,
      "familyCaption": null,
      "pullQuote": null,
      "bio": "Samuel grew up in Kisumu hearing Scripture read in a language his grandmother never fully understood. That memory carried him through linguistics training and, in 2014, into full-time translation work with Grace, a trained teacher.\n\nToday they serve the Turkana cluster as team advisors: coaching mother-tongue translators through drafting, arranging community checks in village congregations, and preparing each book for consultant review. Their long-term prayer is a complete Turkana New Testament read aloud in every church in the region.",
      "email": null
    }
  ],
  "prayerRequests": [],
  "resources": [
    {
      "id": "r1",
      "type": "report",
      "title": "2026 Impact Report",
      "meta": "12 pages",
      "href": "#"
    },
    {
      "id": "r2",
      "type": "guide",
      "title": "Prayer Guide for Bible Translation",
      "meta": "Monthly",
      "href": "#"
    },
    {
      "id": "r3",
      "type": "pdf",
      "title": "Church Partnership Starter Pack",
      "meta": "8 pages",
      "href": "#"
    },
    {
      "id": "r4",
      "type": "video",
      "title": "Vision 2025 — Field Film",
      "meta": "6 min",
      "href": "#"
    },
    {
      "id": "r5",
      "type": "audio",
      "title": "Field Update Podcast, Episode 12",
      "meta": "24 min",
      "href": "#"
    },
    {
      "id": "r6",
      "type": "pdf",
      "title": "No Bible Sunday Planning Kit",
      "meta": "5 pages",
      "href": "#"
    }
  ],
  "faqs": [
    {
      "id": "f1",
      "question": "How is my gift used?",
      "answer": "Gifts are stewarded toward translation drafting, community checking, consultant review, training, and Scripture engagement across Africa. Visit the Give page for a full breakdown."
    },
    {
      "id": "f2",
      "question": "Can I support a specific missionary?",
      "answer": "Yes — each missionary raises support relationship by relationship. Visit Our Missionaries to read profiles and start a monthly partnership."
    },
    {
      "id": "f3",
      "question": "How can my church get involved?",
      "answer": "Churches can adopt a language community in prayer and giving, host a missions Sunday, or form a missions committee. See Motivate your Church for a starting checklist."
    },
    {
      "id": "f4",
      "question": "How do I apply to serve with Wycliffe Africa?",
      "answer": "Start with the preliminary questionnaire — it takes about ten minutes and helps our team understand where your skills might fit the work."
    }
  ]
};

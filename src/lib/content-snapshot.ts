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
      "body": "For years, the Marakwet church celebrated one remarkable gift. The New Testament in the language of their hearts. It transformed worship, deepened discipleship, and opened God's Word to many in a deeply personal way. Yet even in celebration, one prayer remained.\n\n\"We now have half a beehive,\" church leaders said after the New Testament was dedicated in 2009. \"Help us receive the whole beehive.\"\n\nIn Marakwet culture, a beehive is a symbol of abundance and sweetness. For the church, it became a picture of something even greater. The New Testament had nourished their faith, but they longed for the richness of the entire counsel of God.\n\nThat prayer was answered on 1 August 2026, when the Marakwet community gathered at Tot Primary School to dedicate the complete Bible in the Marakwet language. It was more than the launch of a book. It was the celebration of a journey marked by faith, perseverance, and God's faithfulness over more than four decades.\n\nThe journey began in 1983, when Bible Translation and Literacy (BTL) initiated language development, Bible translation, and literacy work among the Endo–Marakwet people, who number about 120,000.\n\nLike many Bible translation journeys, the road was not without challenges. Periods of insecurity in the region disrupted the work, requiring the translation team to temporarily relocate to Eldoret while they waited for stability to return. Even then, the vision never faded. When peace was restored, the translators returned with renewed determination, continuing the work that would eventually place the Scriptures into the hands of their own community.\n\nTheir perseverance bore fruit in 2009 with the dedication of the Marakwet New Testament. Three years later, inspired by the church's heartfelt appeal for \"the whole beehive,\" work on translating the Old Testament began. Fourteen years later, that vision has become reality.\n\nFor Wycliffe Africa Director Emeritus Edwyn Kiptinness, this milestone is deeply personal.\n\nLong before the Marakwet Bible became a reality, a young boy lay in a hospital bed recovering from a devastating leg injury. During the ten months he spent there, two missionaries placed a Nandi Bible in his hands. He read it eagerly, but because it was not in his own language, much of it remained difficult to understand.\n\nThat experience planted a conviction that would shape the rest of his life: every community deserves the opportunity to encounter God's Word in the language they understand best.\n\nAs a Marakwet speaker, Kiptinness became one of the strongest advocates for translating the Bible into Marakwet. The proposal initially faced resistance, with concerns that recognizing Marakwet separately might divide the wider Kalenjin community. Still, he remained convinced that making Scripture accessible in people's heart language was worth pursuing. His persistence helped pave the way for the project, and he even donated family land to support the translation work.\n\nToday, the dedication of the complete Marakwet Bible stands as a testimony to what God can accomplish through faithful partnership, patient perseverance, and a community that refused to stop praying.\n\nSomewhere in Marakwet today, a child will hear the story of creation in the language spoken at home. A family will read from Genesis together for the first time in their mother tongue. A pastor will preach from both the Old and New Testaments without leaving the language of the people before him.\n\nThat is the true significance of this milestone.\n\nThe Marakwet Bible is more than a completed translation. It is an answered prayer, a legacy of faithful partnership, and an invitation for generations to encounter God through His Word in the language of their hearts.",
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
      "body": "Whether in a workplace or a children's Bible club, missionary Lilian Barah continues to share the love of Christ by helping people discover what it means to live out the Gospel every day.\n\nLilian serves through discipleship, trauma healing, mentoring, and practical skills development. She has a special passion for children and young women, walking alongside them as they grow spiritually and practically through Bible study, sewing, and life-skills training.\n\nAfter recently completing her school term, Lilian was warmly welcomed back by the women she mentors. They were eager for her to resume leading their Bible lessons — a reminder of the meaningful relationships she has built through consistent discipleship.\n\nIn her latest women's fellowship, Lilian taught on \"Living the Good News Through Empathy in Our Workplace.\" As the discussion unfolded, many women reflected honestly on their experiences at work and in business. The lesson challenged them to treat customers and colleagues with greater compassion, recognizing that their workplaces are also mission fields where they can demonstrate the love of Christ.\n\n\"The women openly shared their experiences,\" Lilian says. \"Many appreciated the lesson and admitted there were times they had not treated others well. We desire to use our workplaces to share the Good News and reach those who may never hear it otherwise.\"\n\nLilian also continued her children's Bible Club, even though attendance was smaller because many children were away on holiday. Together they explored the theme \"God Created Me,\" based on Psalm 139:14: \"I praise You because I am fearfully and wonderfully made.\"\n\nThrough stories, questions, and lively discussions, the children learned that every person is created in God's image and deeply valued by Him. While none of the children made a decision to follow Christ during the session, Lilian remains encouraged by their growing understanding and continues to pray that the seeds planted in their hearts will bear lasting fruit.\n\nAs Lilian faithfully serves through teaching, mentoring, and discipleship, lives are being shaped one lesson, one conversation, and one child at a time.",
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
    }
  ],
  "missionaries": [
    {
      "id": "a7bec3b7-3e6c-4430-8db3-add343666d46",
      "slug": "cornel-sharon-aora",
      "status": "published",
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
      "id": "barah",
      "slug": "frans-lilian-barah",
      "status": "published",
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
      "id": "teera",
      "slug": "lydia-teera",
      "status": "published",
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

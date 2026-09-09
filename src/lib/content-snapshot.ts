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
      "intro": "For more than two decades, Frans and Lilian Barah have served together in Bible translation, church ministry, leadership development, and community transformation. Their shared desire is simple: to know Christ and make Him known by equipping others and helping communities experience the transforming power of God's Word.",
      "image": "c1bc0970-76d9-40ee-9cde-df351007bff6",
      "familyImage": null,
      "familyCaption": null,
      "pullQuote": null,
      "bio": "Frans serves as a Language Technology Consultant and Associate Domain Team Leader for Language Technology in the SIL Africa Area. He trains, mentors, and supports Bible translation teams across Africa in using technology for translation, literacy, and the production of printed and digital Scripture resources. He is especially passionate about developing African leaders and building sustainable local capacity.\n\nLilian serves through discipleship, trauma healing, mentoring, and practical skills development. She has a special passion for children and young women, helping them grow spiritually and practically through Bible study, sewing, and life-skills training.\n\nFor more than two decades, Frans and Lilian have served together in Bible translation, church ministry, leadership development, and community transformation. Their calling: to know Christ and make Him known by equipping others and helping communities experience the transforming power of God's Word.",
      "prayerPoints": "Pray for wisdom and strength as Frans trains and supports Bible translation teams across Africa.\nPray for Lilian as she disciples and mentors children and young women, especially those walking through difficult experiences.\nPray for continued opportunities to develop African leaders and strengthen local capacity for Bible translation.\nPray for Frans and Lilian as they serve together, that God would continue to use their gifts to make Christ known and see His Word transform lives.",
      "email": "frans_barah@wycliffeafrica.org"
    },
    {
      "id": "mwendwa",
      "slug": "nicholus-mwendwa",
      "status": "published",
      "name": "Nicholus Mwendwa",
      "place": "Kenya",
      "roles": "Accountant – Wycliffe Africa",
      "intro": "Nicholus Mwendwa serves with Wycliffe Africa as an Accountant, using his professional skills in finance and administration to support missionaries and the wider ministry of Bible translation.",
      "image": null,
      "familyImage": null,
      "familyCaption": null,
      "pullQuote": "I may not be the person translating every word of Scripture, but I can faithfully use what God has placed in my hands to help make the work possible.",
      "bio": "His desire to serve God began many years ago. Growing up in a Christian family shaped his love for Christ and strengthened his desire to be involved in ministry. When he joined Wycliffe Africa, he experienced a deep sense of God's peace, confirming that this was more than a professional opportunity—it was an opportunity to serve God through the gifts and skills He had given him.\n\nOne experience has particularly shaped how Nicholus sees his role. He remembers watching his grandmother read Scripture in her mother tongue. Seeing the joy and smile on her face as she engaged with God's Word helped him realise that many others deserve to experience that same joy. That moment gave him a deeper appreciation for Bible translation and for the many people whose work helps make Scripture accessible in languages people understand.\n\nAs an accountant, Nicholus supports Wycliffe Africa's missionaries by helping ensure that the resources entrusted to the ministry are properly managed. His responsibilities include financial reporting, budgeting, reconciliations, expenditure monitoring, audit support and financial compliance. For Nicholus, accounting is not simply about numbers—it is about stewardship and ministry.\n\nHe believes every resource entrusted to Wycliffe Africa should be handled with integrity and used responsibly to advance God's mission. By providing sound financial and administrative support, he helps create an environment where missionaries can focus on the work God has called them to do.\n\nWhat keeps him going is knowing that his work is connected to something much bigger than himself. Behind every financial report, payment and budget are missionaries and communities that are part of the larger story of God's Word reaching people in languages they understand. His grandmother's joy continues to remind him that many people are still waiting to experience the same privilege of reading God's Word in their own language.\n\nNicholus desires to serve with integrity, excellence and faithfulness, knowing that even a role behind the scenes can contribute to the transformation that comes through God's Word. Looking back, he is grateful for how God has brought together his Christian upbringing, professional training, passion for ministry and desire to serve His mission. His grandmother's smile remains a powerful reminder of why this work matters—and of the joy he hopes many more people will experience as God's Word becomes available in their own languages.",
      "prayerPoints": "Pray for wisdom and integrity as Nicholus manages the financial resources entrusted to Wycliffe Africa.\nPray for Wycliffe Africa's missionaries, that they will have the resources and encouragement they need to serve effectively.\nPray for Nicholus's continued spiritual and professional growth as he serves.\nPray for the Bible translation movement and for more communities to gain access to God's Word in their own languages.",
      "email": null
    },
    {
      "id": "otabil",
      "slug": "otabil-arthur",
      "status": "published",
      "name": "Otabil Arthur",
      "place": "Accra, Ghana",
      "roles": "Online Content and Design Manager – Wycliffe Global Alliance",
      "intro": "Otabil Arthur is a storyteller, strategic communicator, and missionary serving with Wycliffe Africa from Accra, Ghana. As the Online Content and Design Manager for the Wycliffe Global Alliance, he uses storytelling, visual communication and digital media to connect people with the work of Bible translation and help mobilise the global Church around the movement.",
      "image": null,
      "familyImage": null,
      "familyCaption": null,
      "pullQuote": "Otabil's heart is to see every language group encounter the living Word of God.",
      "bio": "Before serving in his current role, Otabil spent 11 years working in Communications and Fundraising with the Ghana Institute of Linguistics, Literacy and Bible Translation (GILLBT). During that time, he helped tell the stories of local language communities and mobilise support for mother-tongue Scripture work.\n\nHis passion for communicating the Gospel also extends beyond the digital space. Otabil serves as the Distant Missions Coordinator at Legon Interdenominational Church (LIC) in Accra, where he helps lead teams in reaching unreached people groups. Through this ministry, he combines communication and media mobilisation with opportunities to engage directly in evangelism.\n\nFor Otabil, communication is more than creating compelling images or telling good stories. It is a way of helping people see what God is doing among language communities and inviting them to become part of His work.\n\nWith advanced degrees in IT Law and Public Relations, together with specialised training in film and artistic media, Otabil brings together professional expertise and a passion for mission. Through his work in digital content and design, he seeks to make the message of the Bible translation movement clear, engaging and accessible to people around the world.\n\nHe is supported in life and ministry by his wife, Sherrita, and their two children, Menaye and Kow. Together, they share a desire to see people from every language group encounter the living Word of God.\n\nFor Otabil, every story is an opportunity to point people towards what God is doing—and to inspire more people to take part in the mission of making His Word known in every language.",
      "prayerPoints": "Pray for wisdom and creativity as Otabil communicates the work of Bible translation to audiences around the world.\nPray for the Wycliffe Global Alliance and its partners as they seek to see the Bible made accessible to people in every language.\nPray for the unreached people groups Otabil and others are serving, that many will encounter the Gospel.\nPray for strength and grace for Otabil, Sherrita, and their children as they serve God together.",
      "email": null
    },
    {
      "id": "teera",
      "slug": "lydia-teera",
      "status": "published",
      "name": "Lydia Teera",
      "place": "Uganda",
      "roles": "Programme Manager, Learning & Development – SIL Africa",
      "intro": "Lydia Teera is a Ugandan mission leader serving as Programme Manager for Learning & Development with SIL Africa, while seconded from Wycliffe Africa. With more than two decades of missionary service, Lydia is passionate about helping people access education and Scripture in languages they understand best.",
      "image": "c1954f5b-d382-439a-9ba2-8f35196cd149",
      "familyImage": null,
      "familyCaption": null,
      "pullQuote": null,
      "bio": "Her work focuses on advocacy, partnership building and strengthening initiatives that promote language-inclusive education and meaningful engagement with Scripture across African communities. For Lydia, language is more than a means of communication—it can become a bridge to learning, faith and community transformation.\n\nIn Uganda, Lydia contributes to initiatives addressing language barriers in education, particularly among refugee and host communities. She has co-led evidence-based programmes that equip educators with multilingual classroom strategies and practical approaches that can be adopted by governments and other institutions. By bringing together research, training and community engagement, she works to help learners access education without language becoming a barrier.\n\nLydia's journey in missions began more than 20 years ago when she made the decision to dedicate her life to advancing God's mission through Bible translation and language development. Since then, advocacy, communication and partnership building have become important parts of her ministry. She is also a co-author of a bridging programme that supports refugee learners as they transition into Ugandan schools.\n\nOne language community that holds a special place in Lydia's heart is the Pokot in northeastern Uganda. The community faces challenges including low literacy, limited access to basic resources and the difficulties of remote geography. Lydia has invested significant time in supporting their language development and helping address some of the barriers that affect their access to education and the Christian faith.\n\nHer passion for language and Scripture also shapes the way she encourages others to join the mission. Lydia is a key contributor to Wycliffe Africa's partnerships with other mission organisations to recruit and send African missionaries into Bible translation work around the world. Through this ministry, she has helped recruit several missionaries now serving in Uganda.\n\nBeyond her work, Lydia enjoys meaningful conversations about Scripture and the role language plays in shaping identity and faith. She also loves sharing stories that highlight the impact of Bible translation and education initiatives. When she is at home, you will often find her enjoying time in her garden.\n\nAcross her many areas of service, Lydia continues to carry one desire: that language would open doors rather than close them—helping people learn, encounter Scripture, grow in faith and participate fully in their communities.",
      "prayerPoints": "Pray for Lydia's advocacy for language-inclusive education and meaningful engagement with Scripture across African communities.\nPray for refugee and host communities in Uganda, that language barriers would not prevent children and families from accessing education and opportunities to thrive.\nPray for the Pokot community and for continued progress in language development, literacy and access to God's Word.\nPray for Wycliffe Africa's partnerships and missionary mobilisation efforts, that more African Christians would respond to God's call to serve in Bible translation around the world.\nPray for wisdom, strength and grace for Lydia as she continues to serve across education, language development and mission mobilisation.",
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

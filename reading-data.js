// ============================================================
//  BandWise — Reading Data
//  All passages + questions for the Reading page
//  Question types:
//    'tfng'  → True / False / Not Given  (MCQ buttons)
//    'ynng'  → Yes / No / Not Given      (MCQ buttons)
//    'mcq'   → Multiple choice A-D       (MCQ buttons)
//    'match' → Heading match i-viii      (MCQ buttons)
//    'fill'  → Typed answer (note/sentence completion)
//    'ends'  → Sentence endings match    (MCQ buttons)
// ============================================================

const PASSAGES = [

  // ══════════════════════════════════════════════════════════
  //  PASSAGE 1 — Easy — Chocolate for the Masses
  // ══════════════════════════════════════════════════════════
  {
    id: 1,
    slug: 'chocolate-masses',
    difficulty: 'easy',
    title: 'Chocolate for the Masses',
    description: 'The fascinating history of how chocolate transformed from a drink of the elite into a global mass-market product over two centuries.',
    words: '~900',
    minutes: 20,
    questionCount: 13,
    access: 'free',
    tags: ['T/F/NG', 'Note Completion', 'Academic'],
    questionTypes: ['True / False / Not Given (Q1–6)', 'Note Completion — typed (Q7–13)'],

    paragraphs: [
      'For almost three thousand years, chocolate was a drink of the elite and the wealthy, originally in South America and later on in Europe. In the early 19th century, however, chocolate became far more widely available, and consumption shot up dramatically across the populations of Europe in particular.',
      'It was 1828 that marked the beginning of the modern era in chocolate making and production. Chocolate as a drink had been known for centuries, but in 1828 a Dutch chemist named Van Houten developed a process for the manufacture of a new kind of powdered chocolate using a hydraulic press. Untreated "chocolate liquor" — the end result of grinding the cacao beans from which chocolate is obtained — contains about 53 per cent cacao butter, but this machine removed nearly half of this, leaving a cake that could be pulverized into a fine powder — what is now known as "cocoa".',
      'In 1847, the British firm Fry and Sons found a way to mix a blend of cocoa powder and sugar with melted cacao butter to produce a thin paste which could be cast into various shapes. This was the world\'s first true solid chocolate. Thanks to immediate high demand for this product, the price of cacao butter escalated, so the new solid chocolate was only accessible for the elite. But this would eventually change, because of the introduction of cost-cutting methods and mass production.',
      'By the latter half of the 19th century, many manufacturers had begun making their own chocolate, and using cocoa powder to hand-coat sugar confections. Cocoa powder also reached wide use in many other products, like ice creams and biscuits. Entrepreneurial families like the Frys and Cadburys in Britain had a social conscience in the midst of all this money-making. In the Birmingham suburb of Bournville, where they had established their chocolate factory, the Cadburys created a model town with adequate housing for their workers, and even dining and reading rooms so that their employees had no need to spend anything on entertaining themselves.',
      'However, the rising demand for chocolate also made it a target for unscrupulous producers and merchants. Sometimes the expensive cacao butter was completely extracted and replaced with olive or almond oil, or egg yolks. Alternatively, cheaper materials such as potato starch or flour were added. In 1850, a health commission was created in Britain for the analysis of foods — suspicions about chocolate proved well-founded — most of the samples contained starch grains from potatoes or other plants. The investigation inspired the British Food and Drug Act of 1860 and the Adulteration of Food Act of 1872.',
      'The invention of milk chocolate took place in Switzerland, and was a collaboration between two men. The first was Henri Nestlé, a chemist who in 1867 discovered a process to make powdered milk by evaporation; when mixed with water, this could be fed to infants and small children. The second man, Daniel Peter, came up with the idea of using Nestlé\'s milk powder in the manufacture of a new kind of chocolate, and, in 1879, the first milk chocolate bar was produced.',
      'Also in 1879 another Swiss, Rodolphe Lindt, invented the conche machine, which vastly improved the quality of chocolate confectionery. Before Lindt, solid chocolate was usually coarse and gritty. Now, however, it achieved such a degree of smoothness that Lindt named it "fondant". People on both sides of the Atlantic developed a taste for fondant chocolate, and the use of the conche machine for solid chocolate became universal in the business.',
      'In the USA, Milton Hershey dominated the chocolate industry. In 1893, after seeing examples of the machinery used in Europe in action at an international exhibition in Chicago, he bought some and began turning out chocolate coatings for the caramels he was already producing. But after a trip to the chocolate centres of Europe, he sold his caramel business for a million dollars, bought a farm in Pennsylvania, and built a chocolate factory there.',
      'This became the nucleus of "Hershey, the Chocolate Town", which contained amongst other things Hershey\'s imposing mansion, the Hershey Department Store and the Hershey Bank. There was, however, no elected mayor or indeed any democratic system in place. The whole town was in essence Milton Hershey\'s private kingdom, and he ran it as he wanted.',
      'During a trip to Cuba in 1915, Hershey was inspired to build a new model town centred round a mill for grinding sugar. To transport the refined sugar so that it could be shipped by sea to his chocolate and cocoa factory, Hershey built modern electric railroads.',
      'To help advertise his products, Hershey employed nutritionists to proclaim their health qualities, and his chocolate bars and cocoa soon commanded the American market. Everything was mechanized — a true assembly-line operation. Hershey\'s best-selling King bar contained almonds imported from southern Europe dropped by machines into the waiting moulds. Another popular product was "Hershey\'s Kisses" — bite-sized, flat-bottomed drops of chocolate, individually wrapped.',
      'Nowadays so many tourists visit Hershey that the company no longer offers tours of its factory. Rather, visitors are whisked along on automated carts through an exhibition called "Chocolate World", where they can see how their favourite products are produced.'
    ],

    sections: [
      {
        label: 'Questions 1–6',
        type: 'tfng',
        instruction: 'Write <strong>TRUE</strong> if the statement agrees, <strong>FALSE</strong> if it contradicts, or <strong>NOT GIVEN</strong> if there is no information.',
        questions: [
          { num: 1, text: 'Chocolate was consumed by greater numbers of people in the nineteenth century than in previous times.', answer: 'TRUE' },
          { num: 2, text: 'Fry\'s chocolate became more affordable because of the fall in price of one ingredient.', answer: 'FALSE' },
          { num: 3, text: 'Entrepreneurial British chocolate manufacturers paid their employees well.', answer: 'NOT GIVEN' },
          { num: 4, text: 'Customers were made ill through the practices of unscrupulous chocolate producers.', answer: 'NOT GIVEN' },
          { num: 5, text: 'Fresh milk was used in the production of milk chocolate in Switzerland.', answer: 'FALSE' },
          { num: 6, text: 'Lindt\'s conche machine was adopted by other manufacturers.', answer: 'TRUE' }
        ]
      },
      {
        label: 'Questions 7–13',
        type: 'fill',
        instruction: 'Choose <strong>ONE WORD ONLY</strong> from the passage for each answer.',
        questions: [
          { num: 7,  text: 'Hershey bought some ________ after visiting a trade fair in Chicago.',        answer: 'machinery' },
          { num: 8,  text: 'After selling his caramel business, Hershey purchased a ________.',           answer: 'farm' },
          { num: 9,  text: 'The inhabitants of Hershey could not vote for a ________.',                   answer: 'mayor' },
          { num: 10, text: 'Hershey constructed ________ to transport material in Cuba.',                 answer: 'railroads' },
          { num: 11, text: 'Hershey brought in ________ to improve the image of his chocolate.',          answer: 'nutritionists' },
          { num: 12, text: 'One popular chocolate product had ________ added to it.',                     answer: 'almonds' },
          { num: 13, text: 'Because of high demand, tourists can only visit the ________ at Hershey.',    answer: 'exhibition' }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════
  //  PASSAGE 2 — Easy — Why Do People Collect Things?
  // ══════════════════════════════════════════════════════════
  {
    id: 2,
    slug: 'why-people-collect',
    difficulty: 'easy',
    title: 'Why Do People Collect Things?',
    description: 'From ancient museums to modern-day hobbyists — an exploration of the deep human instinct to gather and preserve objects.',
    words: '~850',
    minutes: 20,
    questionCount: 13,
    access: 'free',
    tags: ['T/F/NG', 'Note Completion', 'Academic'],
    questionTypes: ['True / False / Not Given (Q1–6)', 'Note Completion — typed (Q7–13)'],

    paragraphs: [
      'People from almost every culture love collecting things. They might collect stamps, books, cards, priceless paintings or worthless ticket stubs to old sports games. Their collection might hang on the walls of a mansion or be stored in a box under the bed. So what is it that drives people to collect? Psychologist Dr Maria Richter argues that the urge to collect is a basic human characteristic. According to her, in the very first years of life we form emotional connections with lifeless objects such as soft toys. And these positive relationships are the starting point for our fascination with collecting objects. In fact, the desire to collect may go back further still. Scientists suggest that for some ancient humans living hundreds of thousands of years ago, collecting may have had a serious purpose. Only by collecting sufficient food supplies to last through freezing winters or dry summers could our ancestors stay alive until the weather improved.',
      'It turns out that even collecting for pleasure has a very long history. In 1925, the archaeologist Leonard Woolley was working at a site in the historic Babylonian city of Ur. Woolley had travelled to the region intending only to excavate the site of a palace. Instead, to his astonishment, he dug up artefacts, which appeared to belong to a 2,500-year-old museum. Among the objects was part of a statue and a piece of a local building. And accompanying some of the artefacts were descriptions like modern-day labels. These texts appeared in three languages and were carved into pieces of clay. It seems likely that this early private collection of objects was created by Princess Ennigaldi, the daughter of King Nabonidus. However, very little else is known about Princess Ennigaldi or what her motivations were for setting up her collection.',
      'This may have been one of the first large private collections, but it was not the last. Indeed, the fashion for establishing collections really got started in Europe around 2,000 years later with so-called "Cabinets of Curiosities". These were collections, usually belonging to wealthy families that were displayed in cabinets or small rooms. Cabinets of Curiosities typically included fine paintings and drawings, but equal importance was given to exhibits from the natural world such as animal specimens, shells and plants.',
      'Some significant private collections of this sort date from the fifteenth century. One of the first belonged to the Medici family. The Medicis became a powerful political family in Italy and later a royal house, but banking was originally the source of all their wealth. The family started by collecting coins and valuable gems, then artworks and antiques from around Europe. In 1570 a secret "studio" was built inside the Palazzo Medici to house their growing collection. This exhibition room had solid walls without windows to keep the valuable collection safe.',
      'In the seventeenth century, another fabulous collection was created by a Danish physician named Ole Worm. His collection room contained numerous skeletons and specimens, as well as ancient texts and a laboratory. One of Ole Worm\'s motivations was to point out when other researchers had made mistakes, such as the false claim that birds of paradise had no feet. He also owned a great auk, a species of bird that has now become extinct, and the illustration he produced of it has been of value to later scientists.',
      'The passion for collecting was just as strong in the nineteenth century. Lady Charlotte Guest spoke at least six languages and became well-known for translating English books into Welsh. She also travelled widely throughout Europe acquiring old and rare pottery, which she added to her collection at home in southern England. When Lady Charlotte died in 1895 this collection was given to the Victoria and Albert Museum in London. At around the same time in the north of England, a wealthy goldsmith named Joseph Mayer was building up an enormous collection of artefacts, particularly those dug up from sites in his local area. His legacy, the Mayer Trust, continues to fund public lectures in accordance with his wishes.',
      'In the twentieth century, the writer Beatrix Potter had a magnificent collection of books, insects, plants and other botanical specimens. Most of these were donated to London\'s Natural History Museum, but Beatrix held on to her cabinets of fossils, which she was particularly proud of. In the United States, President Franklin D. Roosevelt began his stamp collection as a child and continued to add to it all his life. The stress associated with being president was easier to cope with, Roosevelt said, by taking time out to focus on his collection. By the end of his life this had expanded to include model ships, coins and artworks.',
      'Most of us will never own collections so large or valuable as these. However, the examples given here suggest that collecting is a passion that has been shared by countless people over many centuries.'
    ],

    sections: [
      {
        label: 'Questions 1–6',
        type: 'tfng',
        instruction: 'Write <strong>TRUE</strong> if the statement agrees, <strong>FALSE</strong> if it contradicts, or <strong>NOT GIVEN</strong> if there is no information.',
        questions: [
          { num: 1, text: 'Dr Maria Richter believes that people become interested in collecting in early childhood.', answer: 'TRUE' },
          { num: 2, text: 'A form of collecting may have helped some ancient humans to survive.', answer: 'TRUE' },
          { num: 3, text: 'Leonard Woolley expected to find the remains of a private collection at Ur.', answer: 'FALSE' },
          { num: 4, text: 'Woolley found writing that identified some of the objects he discovered.', answer: 'TRUE' },
          { num: 5, text: 'Princess Ennigaldi established her collection to show off her wealth.', answer: 'NOT GIVEN' },
          { num: 6, text: 'Displaying artworks was the main purpose of Cabinets of Curiosities.', answer: 'FALSE' }
        ]
      },
      {
        label: 'Questions 7–13',
        type: 'fill',
        instruction: 'Choose <strong>ONE WORD ONLY</strong> from the passage for each answer.',
        questions: [
          { num: 7,  text: 'The Medici family\'s original source of wealth was ________.',                          answer: 'banking' },
          { num: 8,  text: 'The Medici studio had solid walls and no ________ to protect the collection.',         answer: 'windows' },
          { num: 9,  text: 'Ole Worm produced an ________ of the great auk that proved valuable to scientists.',   answer: 'illustration' },
          { num: 10, text: 'Lady Charlotte Guest gave her ________ collection to a London museum.',                 answer: 'pottery' },
          { num: 11, text: 'Joseph Mayer\'s legacy funded public ________ after his death.',                       answer: 'lectures' },
          { num: 12, text: 'Beatrix Potter kept her cabinets of ________ rather than donating them.',              answer: 'fossils' },
          { num: 13, text: 'Roosevelt found that his collection helped him cope with the ________ of his job.',    answer: 'stress' }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════
  //  PASSAGE 3 — Medium — Making Documentary Films
  // ══════════════════════════════════════════════════════════
  {
    id: 3,
    slug: 'documentary-films',
    difficulty: 'medium',
    title: 'Making Documentary Films',
    description: 'From overshadowed beginnings to academic respectability — a survey of how documentary filmmaking evolved throughout the twentieth century.',
    words: '~950',
    minutes: 20,
    questionCount: 13,
    access: 'premium',
    tags: ['Heading Match', 'Multiple Choice', 'Academic'],
    questionTypes: ['Paragraph Headings (Q14–19)', 'Multiple Choice (Q20–23)', 'Note Completion — typed (Q24–26)'],

    paragraphs: [
      '<strong>A</strong>&nbsp; For much of the twentieth century, documentary films were overshadowed by their more successful Hollywood counterparts. For a number of reasons, documentaries were frequently ignored by critics and film studies courses at universities. Firstly, the very idea of documentary film made some people suspicious. As the critic Dr Helmut Fischer put it, "Documentary makers might have ambitions to tell the \'truth\' and show only \'facts\' but there is no such thing as a non-fiction film. That\'s because, as soon as you record an incident on camera, you are altering its reality in a fundamental way." Secondly, even supporters of documentaries could not agree on a precise definition, which did little to improve the reputation of the genre. Lastly, there were also concerns about the ethics of filming subjects without their consent, which is a necessity in many documentary films.',
      '<strong>B</strong>&nbsp; None of this prevented documentaries from being produced, though exactly when the process started is open to question. It is often claimed that <em>Nanook of the North</em> was the first documentary. Made by the American filmmaker Robert J. Flaherty in 1922, the film depicts the hard, sometimes heroic lives of native American peoples in the Canadian Arctic. <em>Nanook of the North</em> is said to have set off a trend that continued through the 1920s with the films of Dziga Vertov in the Soviet Union and works by other filmmakers around the world. However, that 1922 starting point has been disputed by supporters of an earlier date. Among this group is film historian Anthony Berwick, who argues that the genre can be traced back as early as 1895, when similar films started to appear, including newsreels, scientific films and accounts of journeys of exploration.',
      '<strong>C</strong>&nbsp; In the years following 1922, one particular style of documentary started to appear. These films adopted a serious tone while depicting the lives of actual people. Cameras were mounted on tripods and subjects rehearsed and repeated activities for the purposes of the film. British filmmaker John Grierson was an important member of this group. Grierson\'s career lasted nearly 40 years, beginning with <em>Drifters</em> (1929) and culminating with <em>I Remember, I Remember</em> (1968). However, by the 1960s Grierson\'s style of film was being rejected by the Direct Cinema movement, which wanted to produce more natural and authentic films: cameras were hand-held; no additional lighting or sound was used; and the subjects did not rehearse. According to film writer Paula Murphy, the principles and methods of Direct Cinema brought documentaries to the attention of universities and film historians as never before. Documentaries started to be recognized as a distinct genre worthy of serious scholarly analysis.',
      '<strong>D</strong>&nbsp; One of the key developments in documentary filmmaking in recent decades has been the introduction of new technologies. In the past, large budgets were required to produce films of acceptable quality. The cost of good-quality film cameras, lighting equipment, and editing facilities meant that filmmaking was only accessible to professionals. However, the creation of cheaper and smaller digital cameras and editing software meant that these innovations transformed what the public expected to see. As filmmaker Maria Fiala noted, "It isn\'t entirely accurate to say that technology alone changed everything, but without it, the documentary boom of the last 20 years simply wouldn\'t have happened." The result is that anyone with a camera and a computer can now potentially make a professional-looking documentary.',
      '<strong>E</strong>&nbsp; A new generation of documentary makers has also developed a new philosophy about what documentaries should do. This new trend was perhaps most famously illustrated by the film <em>Catfish</em> (2010). The makers of this film, Henry Joost and Ariel Schulman, stated that it is a requirement for documentary makers to express a particular viewpoint and give personal responses to the material they are recording. As filmmaker Josh Camberwell expressed it, "In the new realisation, documentary makers have an obligation to include their own opinions about and analysis of the real events that they show. A documentary that merely records events neutrally is not a true documentary at all."',
      '<strong>F</strong>&nbsp; Today, documentary films have more opportunities than ever to reach large audiences. Film festivals that focus on short documentaries have become an important venue for new filmmakers. The Hamburg Short Film Festival, for example, accepts entries in a category for documentaries that may not exceed three minutes in duration. The Short and Sweet Film Festival is especially good for first-time filmmakers, as experts offer workshops and feedback sessions. The Atlanta Shortsfest has seen the growing popularity of animations as a documentary form, alongside other more established types of documentaries. These are just four examples from the hundreds of festivals that take place every year around the world, giving documentary filmmakers more chances to share their work than at any previous time in history.'
    ],

    sections: [
      {
        label: 'Questions 14–19 · Paragraph Headings',
        type: 'match',
        instruction: 'Choose the correct heading for each paragraph from the list of headings below.',
        options: [
          { letter: 'i',    text: 'Two contrasting historical approaches to filmmaking' },
          { letter: 'ii',   text: 'Two individuals with different ideas about documentaries' },
          { letter: 'iii',  text: 'The growing number of places to show documentary films' },
          { letter: 'iv',   text: 'A number of criticisms of documentaries' },
          { letter: 'v',    text: 'One film that represents a fresh approach' },
          { letter: 'vi',   text: 'Possible future trends in documentary filmmaking' },
          { letter: 'vii',  text: 'A debate about when documentaries first appeared' },
          { letter: 'viii', text: 'How new technology enabled amateur filmmakers' }
        ],
        questions: [
          { num: 14, text: 'Paragraph A', answer: 'iv' },
          { num: 15, text: 'Paragraph B', answer: 'vii' },
          { num: 16, text: 'Paragraph C', answer: 'i' },
          { num: 17, text: 'Paragraph D', answer: 'viii' },
          { num: 18, text: 'Paragraph E', answer: 'v' },
          { num: 19, text: 'Paragraph F', answer: 'iii' }
        ]
      },
      {
        label: 'Questions 20–23 · Multiple Choice',
        type: 'mcq',
        instruction: 'Choose the correct letter, A, B, C or D.',
        questions: [
          {
            num: 20,
            text: 'What does Maria Fiala suggest about new technology in documentary filmmaking?',
            options: [
              { letter: 'A', text: 'It made it possible for audiences to enjoy better-quality films.' },
              { letter: 'B', text: 'It was not the only factor that changed the documentary industry.' },
              { letter: 'C', text: 'It allowed filmmakers to make films without professional equipment.' },
              { letter: 'D', text: 'It transformed the public\'s expectations about documentary content.' }
            ],
            answer: 'B'
          },
          {
            num: 21,
            text: 'What does the writer say about Paula Murphy\'s views on Direct Cinema?',
            options: [
              { letter: 'A', text: 'It helped documentary films gain academic recognition.' },
              { letter: 'B', text: 'It was more popular with audiences than traditional documentaries.' },
              { letter: 'C', text: 'Its techniques were later adopted by Hollywood filmmakers.' },
              { letter: 'D', text: 'It was inspired by the work of John Grierson.' }
            ],
            answer: 'A'
          },
          {
            num: 22,
            text: 'What point does Dr Helmut Fischer make about documentary films?',
            options: [
              { letter: 'A', text: 'Filming an event changes it in an essential way.' },
              { letter: 'B', text: 'They should not claim to represent the truth.' },
              { letter: 'C', text: 'They are less popular than fictional films.' },
              { letter: 'D', text: 'Filming without consent is always unethical.' }
            ],
            answer: 'A'
          },
          {
            num: 23,
            text: 'What does Josh Camberwell believe about documentary filmmakers?',
            options: [
              { letter: 'A', text: 'They should record events as objectively as possible.' },
              { letter: 'B', text: 'They must share their personal perspective on what they film.' },
              { letter: 'C', text: 'They have a responsibility to entertain their audiences.' },
              { letter: 'D', text: 'They should focus on events that affect ordinary people.' }
            ],
            answer: 'B'
          }
        ]
      },
      {
        label: 'Questions 24–26 · Note Completion',
        type: 'fill',
        instruction: 'Complete the notes below. Write <strong>NO MORE THAN THREE WORDS</strong> from the passage for each answer.',
        questions: [
          { num: 24, text: 'Hamburg Short Film Festival: documentaries must be no longer than ________.', answer: 'three minutes', altAnswers: ['3 minutes'] },
          { num: 25, text: 'Short and Sweet Film Festival: particularly suitable for ________ filmmakers.', answer: 'first-time', altAnswers: ['first time', 'first timers'] },
          { num: 26, text: 'Atlanta Shortsfest: reflects the rise in popularity of ________ as a documentary form.', answer: 'animations' }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════
  //  PASSAGE 4 — Hard — Jellyfish
  // ══════════════════════════════════════════════════════════
  {
    id: 4,
    slug: 'jellyfish',
    difficulty: 'hard',
    title: 'Jellyfish',
    description: 'Mysterious, ancient and surprisingly complex — a deep dive into the biology, history and misunderstood nature of one of the ocean\'s most resilient creatures.',
    words: '~1000',
    minutes: 20,
    questionCount: 14,
    access: 'premium',
    tags: ['Yes/No/NG', 'Multiple Choice', 'Sentence Endings', 'Academic'],
    questionTypes: ['Yes / No / Not Given (Q27–32)', 'Multiple Choice (Q33–36)', 'Sentence Endings (Q37–40)'],

    paragraphs: [
      'Most people\'s experience of jellyfish is limited to seeing a dead, shapeless creature washed up on the beach or, perhaps more memorably, being stung by one while swimming. So it is inevitable that many people have a negative view of jellyfish. Yet the reality is that they are fascinating and in many ways remarkable creatures. Despite this, disappointingly little research was carried out into jellyfish during the twentieth century. Marine biologists tended to take the easy option and focus their attention on other ocean species. However, there has been a significant increase in research into jellyfish in recent years, and scientists are finding out remarkable things about these creatures.',
      'Jellyfish live in every ocean in the world and in a range of environments from the shallowest coastal waters to the deepest parts of the ocean. Unlike most sea creatures, jellyfish are able to thrive in water with little or no oxygen. They can also tolerate a wide range of water temperatures and levels of salt. Research conducted in Norway and the Arctic has shown that sound bounces harmlessly off jellyfish, and for this reason scientists are now using sonar to monitor jellyfish without harming them. The use of DNA sequencing and isotope analysis has also resulted in the discovery of numerous additional species of jellyfish unknown to science only a few years ago.',
      'One of the reasons why jellyfish populations may be increasing is climate change. Jellyfish like warm water, and as the temperature of the sea has risen in recent decades, jellyfish have appeared in places where they were previously rarely found. However, climate change is also causing an increase in jellyfish predators such as sea turtles and some fish species, which may help to control jellyfish numbers. At one time, some scientists thought that jellyfish had no predators at all. Paul Dewar\'s research has shown that this is wrong, and the scientific community now recognises that a range of sea creatures eat jellyfish.',
      'It is still widely assumed that jellyfish are among the simplest lifeforms, as they have no brain or central nervous system. While this is true, we now know they possess senses that allow them to see, feel and interact with their environment in subtle ways. What is more, analysis of so-called "upside-down jellyfish" shows that they shut down their bodies and rest in much the same way that humans do at night, something once widely believed to be impossible for jellyfish. Furthermore, far from "floating" in the water as they are still sometimes thought to do, analysis has shown jellyfish to be the most economical swimmers in the animal kingdom. In short, scientific progress in recent years has shown that many of our established beliefs about jellyfish were inaccurate.',
      'Jellyfish, though, are not harmless. Their sting can cause a serious allergic reaction in some people and large outbreaks of them — known as "blooms" — can damage tourist businesses, break fishing nets, overwhelm fish farms and block industrial cooling pipes. On the other hand, jellyfish are a source of medical collagen used in surgery and wound dressings. In addition, a particular protein taken from jellyfish has been used in over 30,000 scientific studies of serious diseases such as Alzheimer\'s. Thus, our relationship with jellyfish is complex as there are a range of conflicting factors to consider.',
      'Jellyfish have existed more or less unchanged for at least 500 million years. Scientists recognise that over the planet\'s history there have been three major extinction events connected with changing environmental conditions. Together, these destroyed 99% of all life, but jellyfish lived through all three. Research in the Mediterranean Sea has now shown, remarkably, that in old age and on the point of death, certain jellyfish are able to revert to an earlier physical state, leading to the assertion that they are immortal. While this may not technically be true, it is certainly an extraordinary discovery. What is more, the oceans today contain 30% more poisonous acid than they did 100 years ago, causing problems for numerous species, but not jellyfish, which may even thrive in more acidic waters. Jellyfish throughout their long history have shown themselves to be remarkably resilient.',
      'Studies of jellyfish in a class known as scyphozoa have shown a lifecycle of three distinct phases. First, thousands of babies known as planulae are released. Then, after a few days the planulae develop into polyps — stationary lifeforms that feed off floating particles. Finally, these are transformed into something that looks like a stack of pancakes, each of which is a tiny jellyfish. It is now understood that all species of jellyfish go through similarly distinct stages of life. This is further evidence of just how sophisticated and unusual these lifeforms are.'
    ],

    sections: [
      {
        label: 'Questions 27–32 · Yes / No / Not Given',
        type: 'ynng',
        instruction: 'Write <strong>YES</strong> if the statement agrees with the writer\'s views, <strong>NO</strong> if it contradicts them, or <strong>NOT GIVEN</strong> if it is impossible to say what the writer thinks.',
        questions: [
          { num: 27, text: 'It is not surprising that jellyfish have a bad reputation among the general public.', answer: 'YES' },
          { num: 28, text: 'Marine biologists should have devoted more time to studying jellyfish in the twentieth century.', answer: 'YES' },
          { num: 29, text: 'Jellyfish are moving from shallow water into deeper parts of the ocean.', answer: 'NOT GIVEN' },
          { num: 30, text: 'Paul Dewar\'s claim that jellyfish have predators has been questioned by other scientists.', answer: 'NO' },
          { num: 31, text: 'The consequences of climate change on jellyfish populations can be reversed.', answer: 'NOT GIVEN' },
          { num: 32, text: 'Paul Dewar\'s findings about jellyfish predators are now widely accepted.', answer: 'YES' }
        ]
      },
      {
        label: 'Questions 33–36 · Multiple Choice',
        type: 'mcq',
        instruction: 'Choose the correct letter, A, B, C or D.',
        questions: [
          {
            num: 33,
            text: 'What is the writer\'s main point in the fourth paragraph?',
            options: [
              { letter: 'A', text: 'Jellyfish are less simple than is commonly believed.' },
              { letter: 'B', text: 'Scientists have corrected several mistaken ideas about jellyfish.' },
              { letter: 'C', text: 'Jellyfish have more in common with humans than was previously thought.' },
              { letter: 'D', text: 'Research into jellyfish has led to important medical discoveries.' }
            ],
            answer: 'B'
          },
          {
            num: 34,
            text: 'What does the writer say about the relationship between jellyfish and humans in the fifth paragraph?',
            options: [
              { letter: 'A', text: 'It involves both positive and negative aspects.' },
              { letter: 'B', text: 'Humans have had a more negative impact on jellyfish than jellyfish have on humans.' },
              { letter: 'C', text: 'The problems jellyfish cause are becoming worse over time.' },
              { letter: 'D', text: 'Jellyfish and humans share many biological similarities.' }
            ],
            answer: 'A'
          },
          {
            num: 35,
            text: 'What is the writer\'s main point in the sixth paragraph?',
            options: [
              { letter: 'A', text: 'Jellyfish may once have inhabited dry land.' },
              { letter: 'B', text: 'Jellyfish improve the environment they live in.' },
              { letter: 'C', text: 'Jellyfish have proved able to survive over time.' },
              { letter: 'D', text: 'Jellyfish have caused other species to become endangered.' }
            ],
            answer: 'C'
          },
          {
            num: 36,
            text: 'The writer refers to the "scyphozoa" in order to',
            options: [
              { letter: 'A', text: 'exemplify the great size of some jellyfish.' },
              { letter: 'B', text: 'illustrate that jellyfish are biologically complex.' },
              { letter: 'C', text: 'explain why certain jellyfish may become extinct.' },
              { letter: 'D', text: 'suggest that scientists still misunderstand jellyfish.' }
            ],
            answer: 'B'
          }
        ]
      },
      {
        label: 'Questions 37–40 · Sentence Endings',
        type: 'ends',
        instruction: 'Complete each sentence with the correct ending, A–F, below.',
        options: [
          { letter: 'A', text: 'it was wrong to assume that jellyfish do not sleep.' },
          { letter: 'B', text: 'certain species of jellyfish have changed their usual diet.' },
          { letter: 'C', text: 'jellyfish can be observed and tracked in ways that do not injure them.' },
          { letter: 'D', text: 'one particular type of jellyfish may be able to live forever.' },
          { letter: 'E', text: 'there are more types of jellyfish than previously realised.' },
          { letter: 'F', text: 'some jellyfish are more dangerous to humans than once thought.' }
        ],
        questions: [
          { num: 37, text: 'Researchers working in Norway and the Arctic have shown that', answer: 'C' },
          { num: 38, text: 'The use of DNA sequencing and isotope analysis has proved that', answer: 'E' },
          { num: 39, text: 'Research into "upside-down jellyfish" showed that', answer: 'A' },
          { num: 40, text: 'Following research in the Mediterranean Sea, it has been claimed that', answer: 'D' }
        ]
      }
    ]
  }

]; // end PASSAGES

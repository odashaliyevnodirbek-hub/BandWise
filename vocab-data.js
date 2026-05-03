const VOCAB_DATA = [
  {
    id: 'silk-road',
    topic: '🏛 Silk Road',
    category: 'History',
    band: 7,
    words: [
      { word: 'commodities', definition: 'Raw materials or goods that are bought and sold', example: 'Silk, spices, and precious metals were key commodities traded along the route.' },
      { word: 'intermediary', definition: 'A person or group acting as a link between two parties', example: 'Persian merchants acted as intermediaries between East Asian and European traders.' },
      { word: 'flourished', definition: 'Developed rapidly and successfully', example: 'Trade flourished along the Silk Road for over a thousand years.' },
      { word: 'diplomatic', definition: 'Relating to the management of international relations', example: 'Diplomatic envoys carried gifts and letters between distant empires.' },
      { word: 'renowned', definition: 'Known and admired by many people; famous', example: 'The city of Samarkand was renowned throughout the ancient world.' },
      { word: 'cosmopolitan', definition: 'Familiar with and at ease in many different cultures', example: 'Chang\'an was a cosmopolitan city with merchants from dozens of nations.' },
      { word: 'geopolitical', definition: 'Relating to politics as influenced by geography', example: 'The route had major geopolitical significance for controlling trade.' },
      { word: 'trajectory', definition: 'The path or course of development of something', example: 'The trajectory of global commerce was shaped by Silk Road exchange.' },
      { word: 'mutually', definition: 'In a way shared by two or more parties', example: 'Trade was mutually beneficial for both Eastern and Western civilisations.' },
      { word: 'catastrophically', definition: 'In a way that involves sudden great disaster', example: 'The Black Death catastrophically disrupted trade routes across Eurasia.' }
    ]
  },
  {
    id: 'ocean-plastic',
    topic: '🌍 Ocean Plastic',
    category: 'Environment',
    band: 6,
    words: [
      { word: 'debris', definition: 'Scattered fragments, typically of waste or rubbish', example: 'Marine debris was found floating thousands of miles from any coastline.' },
      { word: 'accumulation', definition: 'The gradual gathering of something in increasing quantities', example: 'The accumulation of plastic in the Pacific has created a massive garbage patch.' },
      { word: 'persistent', definition: 'Continuing firmly despite difficulty or opposition', example: 'Plastic is persistent in the environment and does not break down easily.' },
      { word: 'biodegrade', definition: 'To decompose naturally through bacteria or other organisms', example: 'Unlike organic waste, most plastics do not biodegrade for centuries.' },
      { word: 'microplastics', definition: 'Tiny plastic particles less than 5mm in size', example: 'Microplastics have been found in the deepest ocean trenches on Earth.' },
      { word: 'ingest', definition: 'To take food or drink into the body', example: 'Seabirds often ingest plastic fragments, mistaking them for food.' },
      { word: 'acute', definition: 'Present or experienced to a severe degree', example: 'The acute danger of plastic pollution is now recognised globally.' },
      { word: 'traction', definition: 'The extent to which an idea gains support or momentum', example: 'The campaign against single-use plastics has gained significant traction.' },
      { word: 'diffuse', definition: 'Spread over a wide area', example: 'Pollution from plastic is diffuse and difficult to clean up efficiently.' },
      { word: 'pervasive', definition: 'Spreading widely throughout an area or group', example: 'Plastic contamination is now pervasive in both marine and terrestrial ecosystems.' }
    ]
  },
  {
    id: 'sleep-science',
    topic: '🧠 Sleep Science',
    category: 'Psychology',
    band: 7,
    words: [
      { word: 'consolidates', definition: 'Makes something stronger or more solid', example: 'Sleep consolidates memories formed during the day into long-term storage.' },
      { word: 'hippocampus', definition: 'A brain region crucial for forming and storing memories', example: 'The hippocampus replays experiences during sleep to strengthen learning.' },
      { word: 'deprivation', definition: 'The harmful lack of basic needs or necessities', example: 'Sleep deprivation for even one night significantly impairs cognitive function.' },
      { word: 'metabolism', definition: 'Chemical processes in the body that convert food to energy', example: 'Poor sleep disrupts metabolism and increases the risk of obesity.' },
      { word: 'amygdala', definition: 'A brain region that processes emotions, especially fear', example: 'The amygdala becomes overactive when a person is sleep-deprived.' },
      { word: 'chronic', definition: 'Persisting for a long time; constantly recurring', example: 'Chronic sleep loss has been linked to serious long-term health issues.' },
      { word: 'restorative', definition: 'Having the ability to restore health, strength, or wellbeing', example: 'Deep sleep is the most restorative phase of the sleep cycle.' },
      { word: 'cognitive', definition: 'Relating to mental processes such as thinking and reasoning', example: 'Cognitive performance declines sharply after 24 hours without sleep.' },
      { word: 'neurological', definition: 'Relating to the nervous system and brain', example: 'Researchers found neurological changes in the brains of poor sleepers.' },
      { word: 'cardiovascular', definition: 'Relating to the heart and blood vessels', example: 'Consistent sleep deprivation raises cardiovascular disease risk significantly.' }
    ]
  },
  {
    id: 'crispr',
    topic: '🔬 CRISPR',
    category: 'Science',
    band: 8,
    words: [
      { word: 'unprecedented', definition: 'Never done or known before', example: 'CRISPR offered unprecedented precision in editing the human genome.' },
      { word: 'adaptive', definition: 'Able to adjust to new conditions', example: 'Bacteria use an adaptive immune system that inspired the CRISPR technology.' },
      { word: 'oncology', definition: 'The branch of medicine dealing with cancer', example: 'CRISPR applications in oncology could revolutionise cancer treatment.' },
      { word: 'germline', definition: 'Genetic material that can be inherited by future generations', example: 'Germline editing is highly controversial because changes are heritable.' },
      { word: 'contentious', definition: 'Causing or likely to cause disagreement or argument', example: 'Editing human embryos remains a contentious ethical issue worldwide.' },
      { word: 'condemnation', definition: 'Strong disapproval; the act of condemning', example: 'The scientist\'s experiment drew international condemnation from ethicists.' },
      { word: 'equity', definition: 'Fairness and justice in the distribution of resources', example: 'Equity concerns arise if gene therapies are only available to the wealthy.' },
      { word: 'formidable', definition: 'Inspiring fear or respect through impressive ability', example: 'CRISPR is a formidable tool that has transformed biological research.' },
      { word: 'confer', definition: 'To grant or give something', example: 'The mutation was found to confer resistance to certain viral infections.' },
      { word: 'genome', definition: 'The complete set of genetic material in an organism', example: 'Scientists have now mapped the entire human genome with high accuracy.' }
    ]
  },
  {
    id: 'gig-economy',
    topic: '💼 Gig Economy',
    category: 'Business',
    band: 6,
    words: [
      { word: 'inaugurate', definition: 'To begin or introduce a new policy, era, or practice', example: 'The rise of smartphones inaugurated a new era of on-demand work.' },
      { word: 'diversify', definition: 'To widen the range of activities or investments', example: 'Many workers diversify their income by taking multiple gig jobs.' },
      { word: 'contractors', definition: 'Workers hired to perform specific tasks rather than employees', example: 'Gig platforms classify their workers as independent contractors.' },
      { word: 'illusory', definition: 'Based on illusion; not real', example: 'The freedom offered by gig work can be illusory when earnings are unstable.' },
      { word: 'algorithmic', definition: 'Controlled or determined by a set of computer instructions', example: 'Drivers have little control over the algorithmic systems that assign them work.' },
      { word: 'fragmented', definition: 'Broken into small disconnected parts', example: 'The gig economy has led to a more fragmented workforce globally.' },
      { word: 'collective', definition: 'Done by people acting as a group', example: 'Gig workers lack collective bargaining rights that traditional employees enjoy.' },
      { word: 'erode', definition: 'To gradually destroy or diminish', example: 'Casualisation of work can erode hard-won labour protections over time.' },
      { word: 'proponents', definition: 'People who argue in favour of something', example: 'Proponents of the gig economy argue it creates flexible employment opportunities.' },
      { word: 'encompass', definition: 'To include comprehensively', example: 'The gig economy now encompasses sectors from transport to skilled freelancing.' }
    ]
  },
  {
    id: 'dystopian',
    topic: '📚 Dystopian Fiction',
    category: 'Literature',
    band: 7,
    words: [
      { word: 'dystopian', definition: 'Relating to an imagined state where everything is unpleasant', example: 'Orwell\'s 1984 remains the most influential dystopian novel ever written.' },
      { word: 'oppression', definition: 'Prolonged cruel or unjust treatment of a group', example: 'The novel depicts the oppression of citizens under a totalitarian regime.' },
      { word: 'totalitarian', definition: 'Relating to a system that controls every aspect of life', example: 'Totalitarian governments in fiction often use surveillance to control citizens.' },
      { word: 'prescient', definition: 'Having or showing knowledge of future events', example: 'Huxley\'s warnings about mass distraction proved remarkably prescient.' },
      { word: 'polemic', definition: 'A strong verbal or written attack on someone or something', example: 'Animal Farm can be read as a political polemic against Stalinist Russia.' },
      { word: 'dehumanising', definition: 'Removing the human qualities or dignity from someone', example: 'Factory conditions in the novel were deliberately dehumanising.' },
      { word: 'authoritarianism', definition: 'A system favouring strict obedience over personal freedom', example: 'The book is a stark warning about the dangers of authoritarianism.' },
      { word: 'phenomenon', definition: 'A fact or situation that is observed to exist or happen', example: 'The popularity of dystopian fiction is a cultural phenomenon of our times.' },
      { word: 'extrapolated', definition: 'Extended existing trends to predict future outcomes', example: 'The author extrapolated current surveillance trends into a terrifying future.' },
      { word: 'utopian', definition: 'Modelled on or aiming for a perfect society', example: 'Every utopian ideal in the novel eventually collapses into its opposite.' }
    ]
  },
  {
    id: 'coffee',
    topic: '☕ Coffee',
    category: 'Culture',
    band: 6,
    words: [
      { word: 'ubiquity', definition: 'The fact of appearing or being found everywhere', example: 'The ubiquity of coffee shops in modern cities reflects a global cultural shift.' },
      { word: 'cultivated', definition: 'Grown and developed under controlled conditions', example: 'Coffee is cultivated in tropical regions known as the Bean Belt.' },
      { word: 'institution', definition: 'An established organisation or practice within a society', example: 'The Viennese coffee house became a cultural institution in the 18th century.' },
      { word: 'Enlightenment', definition: 'A European intellectual movement of the 17th–18th centuries', example: 'Coffee houses were centres of Enlightenment debate and radical ideas.' },
      { word: 'smallholder', definition: 'A farmer who owns and farms a small area of land', example: 'Most coffee is still grown by smallholder farmers in developing countries.' },
      { word: 'transparency', definition: 'Open and honest communication about processes or origins', example: 'Specialty coffee brands market transparency about where beans come from.' },
      { word: 'stimulating', definition: 'Encouraging interest, enthusiasm, or activity', example: 'Caffeine has a stimulating effect on the central nervous system.' },
      { word: 'ritual', definition: 'A sequence of actions performed in a regular way', example: 'For millions, making morning coffee is an important daily ritual.' },
      { word: 'commodity', definition: 'A raw material or product that is widely traded', example: 'Coffee is the second most traded commodity in the world after oil.' },
      { word: 'transcends', definition: 'Goes beyond the limits of something', example: 'Coffee culture now transcends its origins and belongs to the whole world.' }
    ]
  },
  {
    id: 'gut-microbiome',
    topic: '🏥 Gut Microbiome',
    category: 'Health',
    band: 8,
    words: [
      { word: 'microbiome', definition: 'The community of microorganisms living in a particular environment', example: 'A healthy gut microbiome contains trillions of bacteria and other microbes.' },
      { word: 'archaea', definition: 'Single-celled microorganisms distinct from bacteria', example: 'Archaea play a role in digestion and are found throughout the gut.' },
      { word: 'synthesises', definition: 'Produces a substance through a chemical process', example: 'The gut synthesises several vitamins including B12 and vitamin K.' },
      { word: 'pathogens', definition: 'Microorganisms that cause disease', example: 'A diverse microbiome helps the body resist harmful pathogens.' },
      { word: 'bidirectional', definition: 'Operating or occurring in two opposite directions', example: 'The gut-brain axis is bidirectional — each influences the other.' },
      { word: 'neurotransmitter', definition: 'A chemical that carries signals between nerve cells', example: 'The gut produces serotonin, a key neurotransmitter affecting mood.' },
      { word: 'causality', definition: 'The relationship between cause and effect', example: 'Establishing causality between gut health and mental illness is complex.' },
      { word: 'resilient', definition: 'Able to recover quickly from difficulties', example: 'A diverse microbiome is more resilient to disruption from antibiotics.' },
      { word: 'therapeutic', definition: 'Relating to the treatment of a disease or disorder', example: 'Probiotic foods may have therapeutic benefits for digestive conditions.' },
      { word: 'inflammatory', definition: 'Relating to or causing inflammation in the body', example: 'Poor gut health has been linked to inflammatory conditions like Crohn\'s disease.' }
    ]
  }
];

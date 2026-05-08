const MOCK_DATA = {
  mock1: {
    title: 'Mock Test 1',
    reading: {
      timeLimit: 60,
      passages: [
        {
          id: 'p1',
          title: "New Zealand's early crafts and traditions",
          text: `The first groups of people to discover New Zealand come from Polynesia. Exactly when these explorers arrived has often been a matter of debate, but today the general understanding is that it was during the 13th century that their canoes eventually landed on New Zealand's shores. In some ways the new country must have seemed like an ideal place to settle: the land was fertile, and thick forests provided firewood, shelter and building materials. Still, life would have been challenging for the different Polynesian tribes, who had to adapt to a new environment. The tribes only began to refer themselves as Māori, meaning 'ordinary people', when Europeans in search of new opportunities began arriving in the 18th century. To the Maori, of course, the European settlers and sailors were not 'ordinary', but very strange.

It was not only a knowledge of canoe-building and navigation that the Polynesians brought to New Zealand. They were also skilled craftsmen. There is archaeological evidence that the tools they produced were of high quality and would have enabled tribes to plant and harvest crops. Craftsmen were also occupied with making weapons such as knives and axes, which were used for both construction and fighting. Interestingly, some crafts that had once been popular in Polynesian islands were no longer done in New Zealand, although researches are unsure why. Pottery is an example of this, despite that fact the clay needed to make pots and bowls could easily be found in the country.

The Maori word whakairo can be translated as 'decorative work' – this can refer to bone, wood and greenstone carving. Although Maori carvers were influenced by their Polynesian heritage, they developed their own style, including the curved patterns and spirals inspired by New Zealand plants. The same term can also apply to weaving; the crafting of, for example, woven baskets and mats all required knowledge and skill. Carving greenstone, or pounamu as it is called in Maori, was a long process, requiring great patience. Further, because of this mineral's rarity, any greenstone object, such as a piece of jewellery or cutting blade, was a prized possession. For that reason, it was the few people of high status rather than low-ranking members of a tribe who would possess such objects.

As New Zealand had no native mammals except for bats, dolphins and whales, Maori largely had to depend on plants to provide material for their clothing, including their cloaks. Weavers experimented with the inner bark of the houhere, the lacebark tree, but found it unsuitable. But the dried-out leaves and fibres of the flax plant provided a solution. Once a cloak had been woven from flax, it could be decorated. Borders might be dyed black or red, for example. In the case of superior ones made for chiefs or the more important members of a tribe, feathers from kiwi, pigeons or other native birds might be attached. All flax cloaks were rectangular in shape, so had no sleeves, and neither was a hood a feature of this garment. Short cloaks were fastened around a person's neck, and came only to the waist. Pins made of bone, wood or greenstone allowed longer cloaks to be secured at the shoulder; these were a type that were often used for ceremonial occasions. Of course, the construction of cloaks was influenced by the plant material available to Maori weavers. This meant that cloaks were loose-fitting, and while they protected wearers from New Zealand's strong sunshine, they were not useful during the winter months. A cloak made from fur or wool could provide insulation from the cold, but not so a cloak made of flax.

The warriors of a tribe required a different kind of cloak to help protect them. To create these special cloaks, the tough fibres of the mountain cabbage tree were used instead. It is not clear to researchers what the entire process involved, but they believe the fibres were left to soak in water over a period of time in order to soften them and make them easier to weave together. Later, once the whole cloak had been constructed, it would be dyed black. To do this, Maori weavers covered it in a special kind of mud they had collected from riverbeds. This was rich in iron due to New Zealand's volcanic landscape. The particular advantage of these cloaks was that the tough cabbage tree fibres they were woven from could reduce the impact of spear tips during a fight with enemy tribes. It is fortunate that some cloaks from the 1800s still survive and can provide us with further insight into the materials and construction techniques that Maori craftsmen used.`,
          questionGroups: [
            {
              type: 'tfng',
              instructions: 'Do the following statements agree with the information given in the Reading Passage? Write TRUE, FALSE or NOT GIVEN.',
              questions: [
                { id: 1, text: 'The exact date when the first Polynesian settlers arrived in New Zealand has always been known.' },
                { id: 2, text: 'The Europeans who first came to New Zealand were interested in trading with the Maori.' },
                { id: 3, text: 'Different groups of craftsmen produced tools and weapons.' },
                { id: 4, text: 'The Maori chose not to make pottery in New Zealand.' },
                { id: 5, text: 'The term whakairo refers to both carving and weaving.' },
                { id: 6, text: 'Only wealthy Maori were able to own objects made of greenstone.' }
              ],
              answers: { 1: 'FALSE', 2: 'NOT GIVEN', 3: 'NOT GIVEN', 4: 'FALSE', 5: 'TRUE', 6: 'FALSE' }
            },
            {
              type: 'notes',
              instructions: 'Complete the notes below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
              title: 'Maori cloaks',
              questions: [
                { id: 7, text: 'Flax cloaks — sometimes adding ___ to the better cloaks' },
                { id: 8, text: 'Designed without a ___' },
                { id: 9, text: 'Tied at either the weather\'s neck or their ___' },
                { id: 10, text: 'Flax cloaks offered no ___ during winter' },
                { id: 11, text: 'Warrior cloaks — weavers had to use ___ to make cabbage tree fibres less stiff' },
                { id: 12, text: 'Mud containing ___ was used to make the cloaks look black' },
                { id: 13, text: '___ could not easily go through the cloaks tough fibres' }
              ],
              answers: { 7: 'feathers', 8: 'hood', 9: 'shoulder', 10: 'insulation', 11: 'water', 12: 'iron', 13: 'spear tips' }
            }
          ]
        },
        {
          id: 'p2',
          title: 'Sleep should be prescribed: what those late nights out could be costing you',
          subtitle: 'Leading neuroscientist Matthew Walker on why sleep deprivation is increasing our risk of cancer, heart attack and Alzheimer\'s – and what you can do about it',
          text: `A    Matthew Walker dreads the question 'What do you do?' On aeroplane it usually means that while everyone else watches movies, he will find himself giving a talk for the benefit of passengers and crew alike. To be specific, Walker is the director of the Center for Human Sleep Science at the University of California. No wonder people long for his advice. As the line between work and leisure grows more blurred, rare is the person who doesn't worry about their sleep. Indeed, it's Walker's conviction that we are in the midst of a 'catastrophic sleep-loss epidemic'. He has now written Why We Sleep, the idea being that once people know of the powerful links between sleep loss and poor health, they will try harder to get the recommended eight hours a night. Sleep deprivation constitutes anything less than seven. 'No one is doing anything about it but things have to change. But when did you ever see a National Health Service poster urging sleep on people? When did a doctor prescribe, not sleeping pills, but sleep itself? It needs to be prioritized.'

B    Why are we so sleep-deprived in this century? In 1942, less than 8% of the population was trying to survive on six hours or less sleep a night; in 2017, almost one in two people is. Some reasons are obvious, but Walker believes, too, that in the developed world sleep is strongly associated with weakness. 'We want to seem busy, and one way we express that is by proclaiming how little sleep we're getting. When I give lectures, people wait behind until there is no one around and then tell me quietly: "I seem to be one of those people who need eight or nine hours' sleep." It's embarrassing to say it in public.'

C    Walker has found clear evidence that without sleep, there is lower energy and disease, and with sleep, there is vitality and health. More than 20 studies all report the same relationship: the shorter your sleep, the shorter your life. For example, adults aged 45 years or older who sleep less than six hours a night are 200% more like to have a heart attack, as compared with those sleeping seven or eight. This is because even one night of sleep reduction will affect a person's heart and significantly increase their blood pressure as a result. Walker also points out that when your sleep becomes short, you are susceptible to weight gain. Among the reasons for this are the fact that inadequate sleep increases levels of the hunger-signalling hormone, ghrelin. 'I'm not going to say that the obesity crisis is caused by the sleep-loss epidemic alone.' Says Walker. 'However, processed food and sedentary lifestyles do not adequately explain its rise. It's now clear that sleep is that third ingredient.'

D    Sleep also has a power effect on the immune system, which is why, when we have flu, our first instinct is to go to bed. If you are tired, you are more likely to get sick. The well-rested also respond better to the flu vaccine so this is something people should bear in mind before visiting their doctors. Walker's book also includes a long section on dreams. Here he details the various ways in which deep sleep – the part when we begin to dream – to how important deep sleep is to young children. If they don't get enough, managing aggressive behavior becomes harder and harder. Does Walker take his own advice when it comes to sleep? 'Yes. I give myself a non-negotiable eight-hour sleep opportunity every night, and I keep very regular hours. I take my sleep incredibly seriously because I have seen the evidence.'

E    Sleep research shows that we sleep in 90-minute cycles, and it's only towards the end of each that we go into deep sleep. Each cycle comprises of NREM sleep (non-rapid eye movement sleep), followed by REM (rapid eye movement) sleep. 'During NREM sleep … your body settles into this lovely low state of energy,' Walker explains. 'REM sleep, on the other hand is … an incredibly active brain state. Your heart and nervous system go through spurts of activity.' Because we need four or five of these cycles to stay healthy, it's important for people to break bad sleep habits. For example, they should not be regularly working late into the night as this affects cognitive functioning. Depending on sleep pills is also not a good idea, as it can have a damaging effect on memory.

F    So what can individuals do to ensure they get the right amount of sleep? Firstly, we could think about getting ready for sleep in the same way prepare for the end of a workout – say, on a spin bike. 'People use alarms to wake up,' Walker says. 'So why don't we have a bedtime alarm to tell us we've got half an hour, that we should start cycling down?' Companies should think about rewarding sleep. Productivity will rise and motivation will be improved. We can also systematically measure our sleep by using personal tracking devices, Walker says, and points out that some far-sighted companies in the US already give employees time off if they get enough it. While some researchers recommend banning digital devices from the bedroom because of their effect on the sleep-inducing hormone melatonin, Walker believes that technology will eventually be an aid to sleep, as it helps us discover more about the way we function.`,
          questionGroups: [
            {
              type: 'matching',
              instructions: 'The Reading Passage has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F.',
              questions: [
                { id: 14, text: 'A description of the difference between two types of sleep' },
                { id: 15, text: 'A reason why people do not admit to needing a lot of sleep' },
                { id: 16, text: 'Advice about habits that have a negative effect on sleep' },
                { id: 17, text: 'A call for sleep to be taken more seriously as a health issue' },
                { id: 18, text: 'A reference to a change in sleep patterns over time' }
              ],
              answers: { 14: 'E', 15: 'B', 16: 'E', 17: 'A', 18: 'B' }
            },
            {
              type: 'sentence_completion',
              instructions: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
              questions: [
                { id: 19, text: 'Walker says that poor sleep can cause raised ___.' },
                { id: 20, text: 'Sleep loss is described as one of three factors contributing to the ___.' },
                { id: 21, text: 'Walker says that people who sleep well will benefit more from a ___.' },
                { id: 22, text: 'Walker believes that a lack of deep sleep can affect how ___ manage their feelings.' }
              ],
              answers: { 19: 'blood pressure', 20: 'obesity crisis', 21: 'flu vaccine', 22: 'young children' }
            },
            {
              type: 'mcq_multi',
              instructions: 'Choose TWO letters, A–E. Which TWO things does Walker suggest people should do to improve their sleep?',
              options: {
                A: 'Use melatonin products sold by chemists',
                B: 'Remove all technology from the bedroom',
                C: 'Start a routine for preparing to sleep',
                D: 'Use personal devices to record sleep data',
                E: 'Ask employers to start work at a later time'
              },
              questions: [
                { id: '23-24', text: 'Which TWO things does Walker suggest?' }
              ],
              answers: { '23-24': ['C', 'D'] }
            },
            {
              type: 'mcq_multi',
              instructions: 'Choose TWO letters, A–E. Which TWO things are stated about Matthew Walker in the passage?',
              options: {
                A: 'He finds it stressful when people ask about his work in social situations.',
                B: 'His book contains the same information he presents in his lectures.',
                C: 'He has researched the link between sleep and physical fitness.',
                D: 'He has explored the connection between sleep and emotional health.',
                E: 'He follows his own advice about how much sleep to get each night.'
              },
              questions: [
                { id: '25-26', text: 'Which TWO things are stated about Walker?' }
              ],
              answers: { '25-26': ['A', 'E'] }
            }
          ]
        },
        {
          id: 'p3',
          title: 'The future of cities',
          subtitle: 'Professor of Urban Planning Sarah Holmes looks at the challenges of urban living',
          text: `The World Health Organisation has produced a report predicting that 9.8 billion of us will be living on this planet by 2050. Of that number, 72% will be living in urban areas – a higher proportion than ever before. Presented with this information, governments have a duty to consider how best to meet the needs of city residents, and not just for the short-term. Certain problems associated with urban living have been highlighted by research company Richmond-Carver in its latest global survey. At the top of the list survey respondents' concerns is the fact that competition amongst tenants for rental properties has driven the median price up – so much so people need to hold down two or more jobs to meet all their expenses. Another issue the survey highlighted is the difficulty commuters face. Overcrowding means that seats are often not available on long journeys, but more significant is that schedules are unreliable. Many studies have shown the effect that has on a country's productivity. Interestingly, certain problems seem more common in some cities than others: respondents from increasingly crowded European cities, including Manchester and Barcelona, commented on how their quality of life was affected by loud machinery, other people's music and car alarms. Something the survey failed to ask about was the value people placed on having access to nature in urban neighborhoods. However, some countries are already moving forward. Singapore is a prime example; its rooftop gardens make the city a far more desirable place to live. It is the Singaporean government that is behind this push for sustainable living.

Perhaps some clearer government direction would benefit other cities. Take New York City, a place where I frequently meet up with other researchers in my field. Luckily for me, I am driven from the airport to the research centre, so do not need to navigate the freeways and constant congestion. Admittedly my experience of the urban lifestyle here is limited to the hotels I stay in, and the blocks within a three-kilometre walk. But whenever I leave my room in search of an outlet providing fruit or anything with nutritional value, none can be found. It seems ridiculous that this should be the case. New York has made great advances in redeveloping its museums and arts centres, but authorities must recognize that people's basic needs must be met first.

Sometimes these basic needs are misunderstood. In some urban areas, new residential developments are provided with security features such as massive metal fences and multiple gates in the belief that these will make residents safer. There is little evidence such steps make a difference in this way, but we don know they make residents feel reluctant to go outside and walk around their neighbourhood. Instead they are more likely to remain inactive indoors. Grassy areas inside fences developments are hardly used by householders and tenants either. All this adds up to a feeling of being cut off from others.

So where are planners and developers going wrong? Inviting a group of locals to attend a consultation event is the conventional method for discovering what a community might want. The issue here is that it often attracts the same few voices with the same few wishes. But the internet now makes it possible for others to contribute. A community website can be a place where local people propose ideas for making their neighbourhood a better place to live. Developers that pay attention to these ideas can get a clearer picture of the things residents actually want and reduce the risk of throwing away money on things they don't.

An example of a project that truly meets the needs of residents is Container City – a development in London's Docklands area. Constructed from metal containers once used to transport cargo on ships, it is a five-storey architectural masterpiece. The containers have been turned into sunny work studios, and despite their limited size, some come with a bed, shower and kitchen unit. Smart planning and skillful construction mean they take up very little room. Furniture and fittings are made from recycled products. Other countries have their own versions Container City – Amsterdam and Copenhagen have created container dormitories to house students – but the Docklands site shows how work and living areas can effectively be combined. The units are ideal for young entrepreneurs hoping to establish a business while keeping costs down.

Successful development is taking place in many urban areas around the world, and city planners have a duty to see for themselves the transforming effect this can have on residents' lives. There is no better way to do this than to visit these places in person. These might be neighbourhoods constructed for the first time, or developers might have transformed what was already there. In either case, the idea of cars determining urban planning, and indeed the whole concept of private car ownership, is now outdated and must be abandoned. Instead, the layout of an area under development must make it easier for people to meet up in pedestrianized zones and community spaces. At the heart of the development should be a cultural area, providing venues for art, music and street theatre. Such activities bring communities together, and do far more for positive relations than a new mall or shopping precinct. For this reason, these kinds of performance spaces should be prioritized. Finally, planners and developers must be obliged to create, within the same neighbourhood, different types of homes for wealthy professionals, for families, for the elderly and for young people just starting out. This kind of mix is essential to ensure people can buy a home in an area convenient for work, and for a community to stay alive.`,
          questionGroups: [
            {
              type: 'summary_word_list',
              instructions: 'Complete the summary using the list of words, A–H, below. Write the correct letter, A–H.',
              title: 'Survey on problems facing city dwellers',
              summaryText: 'The World Health Organisation has recently published data concerning 27 ___ in cities. This data should indicate the governments that they must think about ways to improve the lives of residents. According to a Richmond-Carver survey, the worst problem facing many city dwellers was 28 ___. The survey also indicated that in some cities, poor 29 ___ can impact dramatically on the economy. Another issue seems to be 30 ___, although this is more often mentioned by survey participants in European countries. Questions on people\'s views on the need for 31 ___ were unfortunately omitted from the survey, but countries like Singapore already seem to be making progress in this respect.',
              wordList: {
                A: 'noise pollution', B: 'recycling facilities', C: 'green areas',
                D: 'employment opportunities', E: 'population growth', F: 'affordable housing',
                G: 'antisocial behaviour', H: 'public transport'
              },
              questions: [
                { id: 27, blank: 27 }, { id: 28, blank: 28 }, { id: 29, blank: 29 },
                { id: 30, blank: 30 }, { id: 31, blank: 31 }
              ],
              answers: { 27: 'E', 28: 'F', 29: 'H', 30: 'A', 31: 'C' }
            },
            {
              type: 'mcq',
              instructions: 'Choose the correct letter, A, B, C or D.',
              questions: [
                {
                  id: 32,
                  text: 'When staying in New York, the writer is frustrated by the fact that',
                  options: {
                    A: 'healthy food cannot easily be obtained.',
                    B: 'bad road design causes daily traffic problems.',
                    C: 'certain venues cannot be reached by foot.',
                    D: 'visitors are all directed to the same kinds of place.'
                  }
                },
                {
                  id: 33,
                  text: 'What does the writer say about security features in new housing developments?',
                  options: {
                    A: 'Developers add them even though residents have not asked for them.',
                    B: 'They prevent residents from forming a community beyond their fence.',
                    C: 'They discourage residents from taking exercise outside.',
                    D: 'Residents feel frightened when they leave the development.'
                  }
                },
                {
                  id: 34,
                  text: 'What point does the writer make about planning consultations?',
                  options: {
                    A: 'Planners and developers distrust online forms of communication.',
                    B: 'Planners and developers tend to build conventional types of buildings.',
                    C: 'They rely on the opinions of a narrow range of people.',
                    D: 'Planners and developers use them to increase their profits.'
                  }
                },
                {
                  id: 35,
                  text: 'What does the writer say about Container City?',
                  options: {
                    A: 'The building materials used are made locally.',
                    B: 'It succeeds because of its clever design.',
                    C: 'It is popular with students for the same reasons as similar projects.',
                    D: 'Its location makes it suitable for development.'
                  }
                }
              ],
              answers: { 32: 'A', 33: 'C', 34: 'C', 35: 'B' }
            },
            {
              type: 'yng',
              instructions: 'Do the following statements agree with the views of the writer in the Reading Passage? Write YES, NO or NOT GIVEN.',
              questions: [
                { id: 36, text: 'City planners should travel to see successful urban developments for themselves.' },
                { id: 37, text: 'It is easier to develop an entirely new neighbourhood than to transform an existing one.' },
                { id: 38, text: 'The needs of car owners should be central to urban planning.' },
                { id: 39, text: 'Retail opportunities should be regarded as more important than cultural venues.' },
                { id: 40, text: 'It is very important to have a mix of different types of residents in a neighbourhood.' }
              ],
              answers: { 36: 'YES', 37: 'NOT GIVEN', 38: 'NO', 39: 'NO', 40: 'YES' }
            }
          ]
        }
      ]
    },
    listening: {
      timeLimit: 30,
      audioUrl: 'https://xiyeuhchpllqlwmlkcma.supabase.co/storage/v1/object/public/audio/test5-listening.mp3',
      parts: [
        {
          id: 'lp1',
          title: 'Listening Part 1',
          instructions: 'Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          formTitle: 'INSURANCE CLAIM FORM',
          questionGroups: [
            {
              type: 'form_completion',
              questions: [
                { id: 1, label: 'Policy reference:', prefix: '', suffix: '' },
                { id: 2, label: 'Address:', prefix: '102', suffix: 'Street, Northbridge' },
                { id: 3, label: 'Phone number:', prefix: '', suffix: '' },
                { id: 4, label: 'Cause of incident:', prefix: 'the house was damaged during a', suffix: '' },
                { id: 5, label: 'Items: a pair of child\'s', prefix: '', suffix: '' },
                { id: 6, label: 'a new', prefix: '', suffix: '' },
                { id: 7, label: 'a torn', prefix: '', suffix: '' },
                { id: 8, label: 'repairs to the door of the', prefix: '', suffix: '' },
                { id: 9, label: 'Builder full name:', prefix: 'Steven', suffix: '' },
                { id: 10, label: 'Client to send photographs of damaged', prefix: '', suffix: 'before building work starts' }
              ],
              answers: {
                1: '05443CHI771', 2: 'Market', 3: '018 669 925', 4: 'storm',
                5: 'glasses', 6: 'carpet', 7: 'curtain', 8: 'garage',
                9: 'Honeywell', 10: 'fence'
              }
            }
          ]
        },
        {
          id: 'lp2',
          title: 'Listening Part 2',
          instructions: 'You will hear a woman who helps run a programme called Young Explorer talking to participants.',
          questionGroups: [
            {
              type: 'mcq_multi',
              instructions: 'Which TWO opportunities does the Young Explorer Programme offer to participants? Choose TWO letters, A–E.',
              options: {
                A: 'Improving negotiation skills',
                B: 'Developing supportive relationships',
                C: 'Acquiring a new physical skill',
                D: 'Learning about environmental issues',
                E: 'Competing for an award'
              },
              questions: [{ id: '11-12', text: 'Which TWO opportunities?' }],
              answers: { '11-12': ['A', 'B'] }
            },
            {
              type: 'mcq_multi',
              instructions: 'Which TWO subjects must groups in their preliminary training? Choose TWO letters, A–E.',
              options: {
                A: 'Finding sources of water',
                B: 'Operating cooking equipment',
                C: 'Knowing how to follow a route',
                D: 'Searching for sage things to eat',
                E: 'Using wood to build shelters'
              },
              questions: [{ id: '13-14', text: 'Which TWO subjects?' }],
              answers: { '13-14': ['B', 'C'] }
            },
            {
              type: 'matching',
              instructions: 'What does the speaker say about each of the following tracks? Write the correct letter, A, B, C or D.',
              options: {
                A: 'It is likely to be busy.',
                B: 'It may be unsafe in places.',
                C: 'It is currently closed to the public.',
                D: 'It is divided into two sections.'
              },
              questions: [
                { id: 15, text: 'Northface' },
                { id: 16, text: 'Blue River' },
                { id: 17, text: 'Pioneer' },
                { id: 18, text: 'Edgewater' },
                { id: 19, text: 'Murray' },
                { id: 20, text: 'Lakeside' }
              ],
              answers: { 15: 'C', 16: 'B', 17: 'D', 18: 'A', 19: 'B', 20: 'A' }
            }
          ]
        },
        {
          id: 'lp3',
          title: 'Listening Part 3',
          instructions: 'You will hear a university tutor talking to two social science students about a project they are doing on the impact of technology on people\'s working lives.',
          questionGroups: [
            {
              type: 'mcq',
              instructions: 'Choose the correct letter, A, B or C.',
              title: 'The Future of Work',
              questions: [
                {
                  id: 21,
                  text: 'Kiara and Finn agree that the articles they read on the future of work',
                  options: {
                    A: 'mainly reflect the concerns of older employees.',
                    B: 'refer to the end of a traditional career path.',
                    C: 'tend to exaggerate the likely changes.'
                  }
                },
                {
                  id: 22,
                  text: 'What point does Kiara make about the phrase "job title"?',
                  options: {
                    A: 'It is no longer relevant in modern times.',
                    B: 'It shows colleagues how to interact with each other.',
                    C: 'It will only apply to people higher up in an organization.'
                  }
                },
                {
                  id: 23,
                  text: 'What issue affecting young employees is Finn most concerned about?',
                  options: {
                    A: 'lack of job security',
                    B: 'income inequality',
                    C: 'poor chances of promotion'
                  }
                },
                {
                  id: 24,
                  text: 'What is Kiara\'s attitude towards the Richards-Greeves survey on work-life balances?',
                  options: {
                    A: 'She thinks that the findings are predictable.',
                    B: 'She is curious about the kind of work the interviewees do.',
                    C: 'She believes it would be useful to know what the questions were.'
                  }
                },
                {
                  id: 25,
                  text: 'Finn and Kiara agree that if employees are obliged to learn new skills,',
                  options: {
                    A: 'they should learn ones which might be useful in another job.',
                    B: 'they should not be forced to learn them in their own time.',
                    C: 'they should receive better guidance from training departments.'
                  }
                },
                {
                  id: 26,
                  text: 'When Finn talks about the impact of mobile technology, Kiara responds by',
                  options: {
                    A: 'emphasizing the possible disadvantages',
                    B: 'describing her personal experience.',
                    C: 'mentioning groups who benefit most from devices.'
                  }
                }
              ],
              answers: { 21: 'B', 22: 'A', 23: 'B', 24: 'C', 25: 'A', 26: 'B' }
            },
            {
              type: 'matching',
              instructions: 'What impact might Artificial Intelligence (AI) have on each of the following professions? Choose FOUR answers from the box and write the correct letter, A–F.',
              options: {
                A: 'It will give them a greater sense of satisfaction.',
                B: 'It will encourage them to compete with one another.',
                C: 'It will reduce the level of stress they have.',
                D: 'It may eventually lead to their jobs disappearing.',
                E: 'It could prevent them from coming to harm.',
                F: 'It will enable them to do tasks they have not trained for.'
              },
              questions: [
                { id: 27, text: 'Architects' },
                { id: 28, text: 'Doctors' },
                { id: 29, text: 'Lawyers' },
                { id: 30, text: 'Sports referees' }
              ],
              answers: { 27: 'B', 28: 'F', 29: 'C', 30: 'D' }
            }
          ]
        },
        {
          id: 'lp4',
          title: 'Listening Part 4',
          instructions: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          questionGroups: [
            {
              type: 'notes_completion',
              title: 'The Klondike Gold Rush of Canada',
              sections: [
                {
                  heading: "The Gold-seekers' journey to the Klondike river",
                  questions: [
                    { id: 31, text: 'The White Pass Trail was difficult because of rocks and ___ along the way.' },
                    { id: 32, text: 'The Chilkoot Trail was very ___ so it could take three months.' },
                    { id: 33, text: 'On both trails, gold-seekers gave up because of starvation, disease and the fear of ___.' },
                    { id: 34, text: 'At Lake Bennet, gold-seekers stayed in a ___ until spring arrived.' },
                    { id: 35, text: 'At Miles Canyon, it was necessary to hire an experienced ___ to continue the journey.' }
                  ]
                },
                {
                  heading: 'The Equipment gold-seekers had to take',
                  questions: [
                    { id: 36, text: 'The ___ provided gold-seekers with a list.' },
                    { id: 37, text: 'The list included tea and food such as ___.' },
                    { id: 38, text: 'Tools, e.g. rope and several ___.' }
                  ]
                },
                {
                  heading: 'People who became successful because of the gold rush',
                  questions: [
                    { id: 39, text: 'Jack London created sense of ___ in his stories.' },
                    { id: 40, text: 'Annie Hall Strong and Emma Kelly contributed to various ___ in Canada and the US.' }
                  ]
                }
              ],
              answers: {
                31: 'mud', 32: 'steep', 33: 'failure', 34: 'tent', 35: 'sailor',
                36: 'police', 37: 'flour', 38: 'buckets', 39: 'adventure', 40: 'newspapers'
              }
            }
          ]
        }
      ]
    }
  }
};

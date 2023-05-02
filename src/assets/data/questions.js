import ryuk from "../images/ryuk.jpg";
import shou from "../images/shou.webp";

export const questions = [
  {
    id: 1,
    question: `He is a very famous wrestler but it is his father who gets all the limelight thanks to his devil back.
        All anime lovers aspire to have a physique like the father son duo but one of them is actually the anatagonist of
        the series. Can you give his full name?`,
    answer: "Yujiro Hanma",
    hint1:
      "A famous anime wrestler. A little search on this topic might give you the answer.",
    hint2: "The name of the father starts with a Y.",
    hint3: "Find the name of Baki Hanma's father.",
    clue: {
      type: "text",
      text: "The question requires no clue as it is too easy. Although, the devil back might be a good place to start searching.",
    },
    points: 10,
  },
  {
    id: 2,
    question: `Rearranging the name of the wrestler and not his father from the previous question will give the name of a famous
    character from the Naruto series. In the clue below is the link to a page where you will find his name along with other 
    members of his team. Click on his name to visit another page where you will find about a particular war in his personality section.
    Click on the war's name and you will be taken to yet another page where you will get the name of the character who declares the war.
    What is his name?`,
    answer: "Tobi",
    hint1:
      "Look for a Naruto character whose name can be spelt by rearranging the letters of BAKI.",
    hint2:
      "Once reaching Kiba's page, go to his personality section and look for a particular world war.",
    hint3:
      "The name of the character is similar to the name of a house elf from the Harry Potter series.",
    clue: {
      type: "link",
      text: "https://naruto.fandom.com/wiki/Konoha_11",
    },
    points: 20,
  },
  {
    id: 3,
    question: `Shigaraki Tomura is the leader of the League Of Villains. Once a fan of the great All Might, he now
      hates him. The league of villains have a rival faction other than the super heroes.This faction later merges with the League of Villains.
      The task is simple name the founder of this opposing faction. You can start your search from the link below.`,
    hint1: "This rival faction appears in the My Villain Academia arc.",
    hint2: "They make their appearance in the anime as well.",
    hint3: "You need to look for the head of the Meta Liberation Army.",
    clue: {
      type: "link",
      text: "https://myheroacademia.fandom.com/wiki/Tomura_Shigaraki",
    },
    answer: "Destro",
    points: 30,
  },
  {
    id: 4,
    question: `The God of the new world has an enemy. Not the loved one but the one who is generally disliked. 
    Can you name him? You will find an image to help you with the search.`,
    hint1: "The image reveals all the information needed.",
    hint2:
      "Remember it is not the main enemy of the character rather someone who comes much later in the anime.",
    hint3: "L had successor. Find him and you get the answer.",
    clue: {
      type: "image",
      text: ryuk,
    },
    answer: "Near",
    points: 40,
  },
  {
    id: 5,
    question: `Even the king of the court has a superior. Though not as gifted as the king himself, he is almost equally talented.
    Name the king's superior.Just the last name will do.`,
    hint1: "Look for an anime character who is called the king of the court.",
    hint2: "The anime is related to sports.",
    hint3: "Karasuno is also known as the fallen champions.",
    clue: {
      type: "text",
      text: "The superior plays in the same position as the king. The superior has a name starting with O.",
    },
    answer: "Oikawa",
    points: 50,
  },
  {
    id: 6,
    question: `This inhuman father used his own daughter for experimentations and merged his daughter with her dog.Name him.This question is tricky.You should use the first hint to get some clue.`,
    hint1:
      "If you look at an item from a different perspective perhaps you might get an answer.",
    hint2:
      "In responsive web design different elements are viewed in different order at different screen sizes",
    hint3:
      "Make the screen size of this webpage below 100px to find the answer.",
    clue: {
      type: "image",
      text: shou,
    },
    answer: "Shou Tucker",
    points: 60,
  },
];

import React from "react";
import ChatView from "./components/ChatView";

const ChatViewScreen = ({ navigation }: any) => {
  const DATA = [
    {
      userName: [
        "Robert Downey",
        "Patty O'Furniture",
        "Teri Dacty",
        "Peg Legge",
        "Allie Grater",
    ],
      property: 'Treat Township'
    },
    {
      userName: [
        "Robert Downey",
        "Paddy O'Furniture",
        "Olive Yew",
        "Aida Bugg",
        "Maureen Biologist",
    ],
      property: 'Cresent heighs'
    },
    {
      userName: [
        "John cena",
        "John cena 1",
        "John cena 2",
        "John cena 3",
        "John cena 4",
    ],
      property: 'Hello caves'
    },
    {
      userName: [
        "David Clein",
        "David Clein 1",
        "David Clein 2",
        "David Clein 3",
        "David Clein 4",
    ],
      property: 'Best outcomes'
    },
    {
      userName: [
        "Derek Dwayne",
        "Derek Dwayne 1",
        "Derek Dwayne 2",
        "Derek Dwayne 3",
        "Derek Dwayne 4",
    ],
      property: 'Daltons Palace'
    },
    {
      userName: [
        "Flora Adams",
        "Flora Adams 1",
        "Flora Adams 2",
        "Flora Adams 3",
        "Flora Adams 4",
    ],
      property: 'Halloween Townsheep'
    },
    {
      userName: [
        "Ketty Parry",
        "Ketty Parry 1",
        "Ketty Parry 2",
        "Ketty Parry 3",
        "Ketty Parry 4",
    ],
      property: 'Leaf Side'
    },
    {
      userName: [
        "Ervin Johnson",
        "Ervin Johnson 1",
        "Ervin Johnson 2",
        "Ervin Johnson 3",
        "Ervin Johnson 4",
    ],
      property: 'Lake View gardens'
    },
  ];

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <>
      <ChatView DATA={DATA} handleDrawerPress={handleDrawerPress} />
    </>
  );
};

export default ChatViewScreen;

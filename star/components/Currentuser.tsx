import React, { createContext, useState } from 'react';

const UserContext = createContext();

function CurrentUser({ children }) {
    // if anything needs to be passed into any other file, toss it in here.

    //     [name    ,   setter   ]  useState<type>(starting value)
    const [username, setUsername] = useState<string>('fail');
    const [userId, setUserId] = useState<number>(-1);
    const [listId, setListId] = useState<number>(3);
    const [listName, setListName] = useState<string>('No List Selected');

    const value = { 
        username, setUsername,
        userId, setUserId,
        listName, setListName,
        listId, setListId,
    };

    return (
        <UserContext.Provider value={value} >
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, CurrentUser };
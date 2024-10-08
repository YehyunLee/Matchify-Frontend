import { useEffect, useState } from "react";
import Head from "next/head";
import Background from "@/components/background";

import { useRouter } from "next/router";
import UserCard from "@/components/user_card";
import FilterEventsTabs from "@/components/filter_events_tabs";
import EventCard from "@/components/event_card";
import FriendCard from "@/components/friend_card";
import SearchBar from "@/components/search_bar";



const Home = () => {
    // Used for redirecting to another page
    const router = useRouter();

    // for search inputs
    const [eventSearch, setEventSearch] = useState('');
    const [headerText, setHeaderText] = useState('Your Events');

    const [friendSearch, setFriendSearch] = useState('');
    const [messagesSearch, setMessagesSearch] = useState('');

    type Tab = 'events' | 'friends' | 'home' | 'friends' | 'messages';
    const [activeTab, setActiveTab] = useState<Tab>('home');

    const [newFriendState, setIsNewFriendToggled] = useState(true);
    const [currentfriendState, setIsCurrentFriendToggled] = useState(false);


    // For handling event clicks
    const handleEventClick = (eventID: number) => {
        console.log('Event ID:', eventID);
    }

    const handleEventSearch = () => {
        console.log('Event Search:', eventSearch);

        setHeaderText('Search Results');
        // TODO: Handle event search logic here
    };

    const handleFriendSearch = () => {
        console.log('Friend Search:', friendSearch);
        // TODO: Handle search logic here
    };

    const handleMessagesSearch = () => {
        console.log('Messages Search:', messagesSearch);
        // TODO: Handle search logic here
    };

    // Redirects for friend_requests.tsx page
    const handleFriendRequestsRedirect = () => {
        router.push('/friend_requests');
    }

    // Redirects for notifications.tsx page
    const handleNotificationsRedirect = () => {
        router.push('/notifications');
    }

    const handleProfileRedirect = () => {
        // HERE WE NEED TO ACCESS SESSION STORAGE
        const user_id = sessionStorage.getItem("user_id") || "Anon"
        router.push('/profile/' + user_id);
    }

    const handleAttendingTab = () => {
        console.log('Attending pressed!');
    };

    const handleLocationTab = () => {
        console.log('Location pressed!');
    }

    const handleDateTab = () => {
        console.log('Date pressed!');
    }

    const handleArtistTab = () => {
        console.log('Artist pressed!');
    }

    const handleGenreTab = () => {
        console.log('Genre pressed!');
    }

    const handleFriendsAttendingTab = () => {
        console.log('Friends Attending pressed!');
    }

    const toggleButton = () => {
        setIsNewFriendToggled(!newFriendState);
        setIsCurrentFriendToggled(!currentfriendState);
    };

    // For changing the page text on top left
    const getTabTitle = () => {
        switch (activeTab) {
            case 'home':
                return 'Home';
            case 'events':
                return 'Events';
            case 'friends':
                return 'Friends';
            case 'messages':
                return 'Messages';
            default:
                return 'Home';
        }
    };
    const users = [
        { profilePicture: "/default_pfp.png", username: "Top G", songName: "I love smoking" },
        { profilePicture: "/default_pfp.png", username: "Jane Doe", songName: "teenage dream by Olivia Rodrigo" },
        { profilePicture: "/default_pfp.png", username: "Jack", songName: "bandaids by Keshi" },
        { profilePicture: "/default_pfp.png", username: "Jack", songName: "bandaids by Keshi" },
        { profilePicture: "/default_pfp.png", username: "Jack", songName: "bandaids by Keshi" },
    ];

    const friends = [
        { key: 1, suggested: true, friendImage: "/default_pfp.png", friendName: "John Doe", bio: "Sigma" },
        { key: 2, suggested: true, friendImage: "/default_pfp.png", friendName: "Hitler", bio: "Sigma 2" },
        { key: 3, suggested: false, friendImage: "/default_pfp.png", friendName: "george floyd", bio: "Sigma 3" },
    ];

    function setSearchQuery(value: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        
        <div className="bg-gray-900 flex flex-col min-h-screen w-screen overflow-y-auto" style={{ backgroundColor: '#282828', marginBottom: '4.5rem' }}>
            <Head>
                <title>{getTabTitle()}</title>
                <meta name="description" content="Home Screen"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
            </Head>
            <div className="h-full w-full p-8">
                <div className="mb-4 flex justify-between items-center">
                    <p className="text-spotify-green font-bold text-2xl">{getTabTitle()}</p>
                    <div className="flex space-x-4">
                        <img src="/heart_icon.svg" alt="Heart Icon" className="w-6 h-6"
                            style={{ transition: 'filter 0.3s ease' }}
                            onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                            onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                            onClick={handleFriendRequestsRedirect}
                        />
                        <img src="/bell_icon.svg" alt="Bell Icon" className="w-6 h-6"
                            style={{ transition: 'filter 0.3s ease' }}
                            onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                            onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                            onClick={handleNotificationsRedirect}
                        />
                        <img src="/default_pfp_v2.png" alt="Profile Icon" className="w-7 h-8" onClick={handleProfileRedirect}/>
                    </div>
                </div>

                {/* Home Page */}
                {activeTab === 'home' && 
                <div className="flex overflow-x-auto no-scrollbar space-x-4">
                    {users.map((user, index) => (
                        <div key={index} className="flex-shrink-0">
                            <UserCard 
                                profilePicture={user.profilePicture} 
                                username={user.username} 
                                songName={user.songName} 
                            />
                        </div>
                    ))}
                </div>}
                <div>
                    {/* Conditionally render the search bar */}
                    {activeTab === 'events' && (
                        <SearchBar
                            placeholder="Search"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleEventSearch();
                                }
                            }}
                        />
                    )}
                </div>
                
                {/* Events Page */}
                {activeTab === 'events' && 
                <div className="flex flex-col items-center mt-4 space-y-4 w-full max-w-screen-lg mx-auto">

     {/* filter tabs */}
    <div className="flex overflow-x-auto no-scrollbar space-x-2 w-full">
        {/* location */}
        <FilterEventsTabs name="Location" onClick={handleLocationTab} />

        {/* date */}
        <FilterEventsTabs name="Date" onClick={handleDateTab} />

        {/* artist */}
        <FilterEventsTabs name="Artist" onClick={handleArtistTab} />

        {/* genre */}
        <FilterEventsTabs name="Genre" onClick={handleGenreTab} />
        
        {/* friend_attending */}
        <FilterEventsTabs name="Friends Attending" onClick={handleFriendsAttendingTab} />

        {/* attending */}
        <FilterEventsTabs name="Attending" onClick={handleAttendingTab} />
        </div>
        

        {/* for events, their event id is unique and is used to identify them in the database */}
        <div className="flex flex-col items-start w-full h-screen ">
            <h1 className="text-2xl font-bold text-white">{headerText}</h1>
            {/* Your events content goes here */}
            <div className="flex flex-wrap justify-center mt-4 space-y-4">
                    <div className="flex-shrink-0">
                        <EventCard
                            key={1}
                            eventName="Kanye West"
                            eventDate="June 24, 2022"
                            eventLocation="New York City"
                            eventImage="/kanye.jpeg"
                            friendImage1="/default_pfp.png"
                            friendImage2="/default_pfp.png"
                            friendName1="John Doe"
                            friendName2="Jane Doe"
                            additionalCount={999}
                            onClick={() => handleEventClick(1)}
                        />
                    </div>

                    <div className="flex-shrink-0">
                        <EventCard
                            key={2}
                            eventName="UFC 214"
                            eventDate="June 26, 2022"
                            eventLocation="Las Vegas"
                            eventImage="/UFC214.jpg"
                            friendImage1="/default_pfp.png"
                            // friendImage2="/default_pfp.png"
                            friendName1="John Doe"
                            // friendName2="Jane Doe"
                            additionalCount={999}
                            onClick={() => handleEventClick(2)}
                        />
                    </div>

                    <div className="flex-shrink-0">
                        <EventCard
                            key={3}
                            eventName="Olypic Basketball Finals"
                            eventDate="August 10, 2024"
                            eventLocation="Paris"
                            eventImage="/olympic_basketball_final.jpg"
                            friendImage1="/default_pfp.png"
                            // friendImage2="/default_pfp.png"
                            friendName1="John Doe"
                            // friendName2="Jane Doe"
                            additionalCount={999}
                            onClick={() => handleEventClick(3)}
                        />
                    </div>
            </div>
        </div>
        </div>}
            {/* Friends Search Bar */}
            {activeTab === 'friends' && (
                <SearchBar
                    placeholder="Search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleFriendSearch();
                        }
                    }}
                />
            )}
            {activeTab === 'friends' && 
                <div className="flex flex-col items-center mt-4">
                <div className="w-full">
                    <button
                        onClick={toggleButton}
                        className="w-1/2 px-4 py-2 mt-4 bg-blue-500 text-white rounded-md"
                        style={{ height: '40px' }} // Adjust height to match the search bar
                    >
                        {newFriendState ? 'new friends' : ''}
                    </button>
                    <button
                        onClick={toggleButton}
                        className="w-1/2 px-4 py-2 mt-4 bg-blue-500 text-white rounded-md"
                        style={{ height: '40px' }} // Adjust height to match the search bar
                    >
                        {currentfriendState ? 'current friends' : ''}
                    </button>
                </div>
                    <div className="mt-8 w-full px-4">
                        <h2 className="text-center text-white text-lg font-bold mb-4">Friends</h2>
                        <ul className="space-y-4">
                            {friends.map((friend, index) => (
                                <div key={index} className="flex-shrink-0">
                                    <FriendCard
                                        friendImage={friend.friendImage} 
                                        friendName={friend.friendName} 
                                        suggested={friend.suggested}
                                        bio={friend.bio}
                                        key={friend.key}
                                        onClick={() => handleEventClick(3)}
                                    />
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            }

            {/* Conditionally render the search bar */}
            {activeTab === 'messages' && (
                <SearchBar
                    placeholder="Search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleMessagesSearch();
                        }
                    }}
                />
            )}
            </div>

            {/* Navigation Bar */}
            <div className="fixed bottom-0 w-full bg-gray-800 p-4">
                <div className="flex justify-around">
                    <div className="flex flex-col items-center" onClick={() => setActiveTab('home')}>
                        <img src="/home_icon.svg" alt="Home Icon" className="w-6 h-6"
                            style={{ 
                                transition: 'filter 0.3s ease',
                                filter: activeTab === 'home' ? 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)' : 'none'
                            }}
                        />
                        <p className={`text-xs ${activeTab === 'home' ? 'text-spotify-green' : 'text-white'}`}>Home</p>
                    </div>
                    <div className="flex flex-col items-center" onClick={() => setActiveTab('events')}>
                        <img src="/event_icon.svg" alt="Event Icon" className="w-6 h-6"
                            style={{ 
                                transition: 'filter 0.3s ease',
                                filter: activeTab === 'events' ? 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)' : 'none'
                            }}
                        />
                        <p className={`text-xs ${activeTab === 'events' ? 'text-spotify-green' : 'text-white'}`}>Events</p>
                    </div>
                    <div className="flex flex-col items-center" onClick={() => setActiveTab('friends')}>
                        <img src="/heart_outline_icon.svg" alt="Heart Icon" className="w-6 h-6"
                            style={{ 
                                transition: 'filter 0.3s ease',
                                filter: activeTab === 'friends' ? 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)' : 'none'
                            }}
                        />
                        <p className={`text-xs ${activeTab === 'friends' ? 'text-spotify-green' : 'text-white'}`}>Friends</p>
                    </div>
                    <div className="flex flex-col items-center" onClick={() => setActiveTab('messages')}>
                        <img src="/message_icon.svg" alt="Message Icon" className="w-6 h-6"
                            style={{ 
                                transition: 'filter 0.3s ease',
                                filter: activeTab === 'messages' ? 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)' : 'none'
                            }}
                        />
                        <p className={`text-xs ${activeTab === 'messages' ? 'text-spotify-green' : 'text-white'}`}>Messages</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
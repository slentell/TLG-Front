import React, { useState, useEffect, createContext, useContext } from 'react';

const axios = require('axios');
const PostContext = createContext({});

export const UsePosts = () => useContext(PostContext)

export const PostProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => { 
        const getAllPosts = async () => {
            try {
                const response = await axios.get('https://throughtheliftingglass.herokuapp.com/tlg/posts/', {
                    headers: {
                        authorization:`JWT ${localStorage.getItem('access')}`,
                    },
                });
                if (response.length !== posts.length) {
                    setPosts(response.data);
                }
            }
            catch(error) {
                console.error("Error fetching posts", error);
            }
        }
        getAllPosts();
    }, [posts])

    return (
        <PostContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostContext.Provider>
    )
}
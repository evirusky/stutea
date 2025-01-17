import React, {useState, useEffect} from 'react'
import { Tag } from './Tag';
import '../css/Tag.css'
import { Link } from 'react-router-dom';
import {ReactComponent as NotifIcon} from "../Assets/Rest/Notification.svg"
// import {ReactComponent as NotifIconActive} from "../Assets/Click/Notification.svg"
import {ReactComponent as CreditIcon} from "../Assets/Click/Credits.svg"
import {ReactComponent as ProfileIcon} from "../Assets/Click/Profile.svg"
import { NavItem } from './Notifications/NavItem';
import { Dropdown } from './Notifications/Dropdown';

export const Tags = () => {
    const host = process.env.REACT_APP_BACKEND_URL;
    const [tags, setTags] = useState({});
    // api call for tag
    const getTags = async() => {
        const response = await fetch(`${host}/api/questions/alltags`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })

        const json = await response.json();
        setTags(json);
    }
    useEffect(() => {
        getTags();
        // console.log(tags);
        // eslint-disable-next-line
    }, [])
    return (
        <>
        <div className="all-tags-here-link">
        <div className="top-icons">
                    {/* <NotifIconActive className='icon-top'/> */}
                    <NavItem icon={<NotifIcon/>}>
                        <Dropdown type="notif"></Dropdown>
                    </NavItem>
                    <NavItem icon={<CreditIcon/>}>
                        <Dropdown type="credits"></Dropdown>
                    </NavItem>
                    <Link to="/profile">
                    <ProfileIcon className="icon-top"/>
                    </Link>
            </div>
            <h2 className="tags-head">All tags here</h2>
            <div className="all-tags">
                {Object.entries(tags).map(([key, value])=> {
                    return (key!=="undefined" && <TagBlock heading={key} list={value}/>)
                })}
            </div>
        </div>
        </>
    )
}

const TagBlock = (props) => {
    const {heading, list} = props;
    return (
        <>
        <div>
            {heading}
            {list.map((tag)=> {
                return <Tag key={tag} value={tag}/>
            })}
        </div>
        </>
    )
}
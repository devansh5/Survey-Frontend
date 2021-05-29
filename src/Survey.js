/* eslint-disable jsx-a11y/alt-text */
import { render } from "@testing-library/react";
import axios from "axios";
import React, { useState ,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import './index.css'
export default function Survey() {
    const [accesstoken,setAccessToken]=useState();
    useEffect(() => {
        axios.get('https://sangini-survey.herokuapp.com/refresh')
        .then(res=>{
            setAccessToken(res.data.data);
        })
    }, [])

    const location =
        ["Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jammu and Kashmir",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttarakhand",
            "Uttar Pradesh",
            "West Bengal",
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli",
            "Daman and Diu",
            "Delhi",
            "Lakshadweep",
            "Puducherry"]
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ accesstoken
    };
    const { register, handleSubmit } = useForm();
    const [search, setSearch] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [error, setError] = useState(false)
    let history = useHistory();
    const onSubmit = data => {
        if( (5 <= selectedTracks.length) && (selectedTracks.length <= 20) ) {
        data['tracks'] = selectedTracks;
        data['artists'] = artists;
        console.log(data);
        console.log("working with");
        axios.post(
            "https://sangini-survey.herokuapp.com/", data
        ).then(res => {
            history.push('/submit')
            console.log(res)
            
        })
    } else {
        setError(true)
    }
    }
    const searchSong = (song) => {
        if (song.length > 3) {
            axios
                .get("https://api.spotify.com/v1/search?q=" + song + "&type=track&limit=5", { headers })
                .then(res => {
                    console.log(res.data.tracks.items);
                    setSearch(res.data.tracks.items)
                });
        }
        else setSearch([])
    };
    const addTrack = (item) => {
        console.log(item)
        let artists= [];
        for (let artist of item.artists){
            artists.push(artist.name)
        }
        setTracks(oldArray => [...oldArray, item
        ])
        setSelectedTracks(prev => [...prev, item.id + " : " + item.name])
        setArtists(prev => [...prev, ...artists])
        setSearch([])
        // console.log(selectedTracks)
        // console.log(artists);
    }

    return (
        <div className='container'>
            <form className="survey-form" onSubmit={handleSubmit(onSubmit)}>
                <h1>Survey Form</h1>
                <span>Please fill this survey form for our research purpose</span>
                <br/>
                <label htmlFor='name'>Name:</label>
                <input className='form-row' {...register('name')} required placeholder='Enter Your Name' />
                <label htmlFor='gender'>Gender:</label>
                <select className='form-row' {...register("gender")} required >
                    <option disabled selected >Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                </select>
                <label htmlFor='age'>Age:</label>
                <input className='form-row' type="number" {...register("age")} required placeholder='Enter your Age' />
                <label htmlFor='location'>Location:</label>
                <select className='form-row' {...register("location")} required >
                    <option disabled selected>Choose Location</option>
                    {location.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                <label htmlFor='tracks'> Please select minimun 5 songs maximun 20 songs:</label>
                <input className='form-row search'  onChange={e => (
                    searchSong(e.target.value)
                )} placeholder="Search & Select Your Songs" />
                { error && <span className="bold">select minimun 5 songs</span>}
                {search.map((item,index)=> (
                    <div className='song' key={index} onClick={() => addTrack(item)}>
                        <img className="song-img" src={item.album.images[2].url} />
                        <p>{item.name} by {item.artists[0].name}</p>
                    </div>
                )
                )}
                <p>Selected Songs:</p>
                {tracks.map((item, index) => (
                    <div className='song' key={index}>
                        <img className="song-img" src={item.album.images[2].url} />
                        <p className="song-title" >{item.name} by {item.artists[0].name}</p>
                    </div>
                ))}
                <button className='submit' type="submit" >Submit</button>
            </form>
        </div>
    );
}

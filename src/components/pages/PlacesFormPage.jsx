import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import AccountNav from '../AccountNav'
import Perks from '../places/Perks'
import UploadPhotos from '../places/UploadPhotos'
import axios from 'axios'

const PlacesFormPage = () => {
    const {id} = useParams();
    const [placeObj, setPlaceObj] = useState({
        title: '',
        address: '',
        addedPhotos: [],
        description: '',
        perks: [],
        extraInfo: '',
        checkIn: '',
        checkOut: '',
        maxGuests: 1,
        price: 100,
    })
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        //id is undefined
        if(!id){
            return;
        }

        axios.get('/places/'+id).then(response =>{
            const {data} = response;
            
            const {title,  address, photos:addedPhotos, 
             description,perks, extraInfo, 
            checkIn,checkOut, maxGuests, price} = data;

            setPlaceObj({
                title,  address,addedPhotos, 
                description,perks, extraInfo, 
               checkIn,checkOut, maxGuests,price

            })
            

        });

    }, [id]);


    function inputHeader(text) {
        return (<h2 className='text-2xl mt-4'>{text}</h2>)
    }

    function inputDes(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    function combinedHeaDes(header, des) {
        return (
            <>
                {inputHeader(header)}
                {inputDes(des)}
            </>
        )
    }

    const handleChange = (fieldName) => (e) => {
        const currentValue = e.target.value;

        setPlaceObj({
            ...placeObj,
            [fieldName]: currentValue,
        })

    }

    async function savePlace(e){
        e.preventDefault();
        
        if(id){
            //update
            await axios.put('/places',{
                id, ...placeObj
            });
            
            setRedirect(true);
        }else{
            //new place
            await axios.post('/places', placeObj);
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to = {'/account/places'} />
    }


  return (
    <div>
        <AccountNav />
    <form onSubmit={savePlace}>
        {combinedHeaDes('Title', 'Title for your place should be short and catchy, as in advertisement')}
        <input type="text"
            placeholder='title, for example: My lovely apt'
            onChange={handleChange('title')}
            value={placeObj.title}
        />

        {combinedHeaDes('Address', 'Address to this place')}
        <input type="text"
            placeholder='address'
            onChange={handleChange('address')}
            value={placeObj.address} />

        {combinedHeaDes('Photos', 'more = better')}
        <UploadPhotos placeObj={placeObj} setPlaceObj = {setPlaceObj} />

        {combinedHeaDes('Description', 'Description for your place')}
        <textarea
            onChange={handleChange('description')}
            value={placeObj.description} />

        {combinedHeaDes('Perks', 'Select all the perks for your place')}

        <div className="grid mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <Perks placeObj = {placeObj} setPlaceObj = {setPlaceObj} />
        </div>

        {combinedHeaDes('Extra info', 'House rules,etc')}
        <textarea
            onChange={handleChange('extraInfo')}
            value={placeObj.extraInfo} />

        {combinedHeaDes('Check in & out times', 'Add check in and check out times, remember to have some time for cleaning')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div >
                <h3 className='mt-2 -mb-1'>Check in Time</h3>
                <input
                    type="number"
                    placeholder='14'
                    onChange={handleChange('checkIn')}
                    value={placeObj.checkIn}
                />
            </div>
            <div >
                <h3 className='mt-2 -mb-1'>Check out Time</h3>
                <input type="number"
                    placeholder='11'
                    onChange={handleChange('checkOut')}
                    value={placeObj.checkOut} />
            </div>
            <div >
                <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                <input
                    type="number"
                    placeholder='1'
                    onChange={handleChange('maxGuests')}
                    value={placeObj.maxGuests} />
            </div>
            <div >
                <h3 className='mt-2 -mb-1'>Price per night</h3>
                <input
                    type="number"
                    placeholder='100'
                    onChange={handleChange('price')}
                    value={placeObj.price} />
            </div>
        </div>

        <button className='primary my-4'>Save</button>
    </form>
</div>
)}



export default PlacesFormPage
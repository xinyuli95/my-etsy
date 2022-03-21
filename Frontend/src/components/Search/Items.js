import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Items() {
    const [items, setItems] = useState([]);
    const [complete, setComplete] = useState(false);
    const keyword = useParams().id;

    useEffect(()=>{ 
        //e.preventDefault();   
        const data = {keyword:keyword};
        axios.post('http://localhost:3001/search',data)
            .then((response) => {
                console.log(response['data']);
                setItems(response['data']);
                console.log("items: ", items);
            })
            .catch((error) => console.log(error));  
        }, [])

    return (
        <div>
            {items.map(item => {
                <div class="col">
                    <div class="item">
                        <div class="name"> {item.itemID} </div>
                        <div class="price"> {item.price} </div>     
                    </div>   
                </div>
                })

            }
        </div>
    );
  }

export default Items;


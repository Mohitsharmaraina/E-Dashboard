import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config';
const Update_product = () => {
    const param = useParams();
    const navigate = useNavigate();
    console.log(param.id);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        currentRecord();
    }, []);

    const currentRecord = async () => {
        let result = await fetch(`${API_BASE_URL}/displayOne/${param.id}`, {
            method: 'get',
            headers: {
                authorization: JSON.parse(localStorage.getItem('auth'))
            }
        })
        let response = await result.json();
        setName(response.name);
        setPrice(response.price);
        setCategory(response.category);
        setCompany(response.company);
    }

    const updating = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false
        }

        let result = await fetch(`${API_BASE_URL}/update/${param.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'content-type': 'application/json',
                authorization: JSON.parse(localStorage.getItem('auth'))
            }
        })
        let resp = await result.json();
        if (resp) {

            navigate('/');
            alert('Product updated successfully!')
        }
    }
    return (
        <div className="add-product">
            <h3>Edit product details</h3>
            <input type="text" className="add-box" value={name} onChange={(e) => setName(e.target.value)}></input>
            {error && !name && <span className="error-msg">Enter valid name</span>}
            <input type="text" className="add-box" value={price} onChange={(e) => setPrice(e.target.value)}></input>
            {error && !price && <span className="error-msg">Enter valid price</span>}
            <input type="text" className="add-box" value={category} onChange={(e) => setCategory(e.target.value)}></input>
            {error && !category && <span className="error-msg">Enter valid category</span>}
            <input type="text" className="add-box" value={company} onChange={(e) => setCompany(e.target.value)}></input>
            {error && !company && <span className="error-msg">Enter valid company</span>}

            <button type="button" id="add-btn" onClick={updating}>Update product</button>
        </div>
    )
}
export default Update_product;
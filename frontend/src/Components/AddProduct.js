import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config';
const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const adding = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false
        }
        const uId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch(`${API_BASE_URL}/add`, {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, uId }),
            headers: {
                'content-type': 'application/json',
                authorization: JSON.parse(localStorage.getItem('auth'))
            }
        })
        let resp = await result.json();
        if (resp) {

            navigate('/');
            alert('Product added successfully!')
        }
    }
    return (
        <div className="add-product">
            <h3>Enter product details</h3>
            <input type="text" className="add-box" placeholder="enter name" value={name} onChange={(e) => setName(e.target.value)}></input>
            {error && !name && <span className="error-msg">Enter valid name</span>}
            <input type="text" className="add-box" placeholder="enter price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
            {error && !price && <span className="error-msg">Enter valid price</span>}
            <input type="text" className="add-box" placeholder="enter category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
            {error && !category && <span className="error-msg">Enter valid category</span>}
            <input type="text" className="add-box" placeholder="enter company" value={company} onChange={(e) => setCompany(e.target.value)}></input>
            {error && !company && <span className="error-msg">Enter valid company</span>}

            <button type="button" id="add-btn" onClick={adding}>Add product</button>
        </div>
    )
}
export default AddProduct;
import { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { API_BASE_URL } from '../config';
const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productListing();
    }, []);

    const productListing = async () => {
        let result = await fetch(`${API_BASE_URL}/display`, {
            headers: {
                authorization: JSON.parse(localStorage.getItem('auth'))
            }
        });
        let response = await result.json();
        setProducts(response);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`${API_BASE_URL}/delete/${id}`, {
            method: 'delete',
            headers: {
                authorization: JSON.parse(localStorage.getItem('auth'))
            }

        })
        let response = await result.json();
        if (response) {
            alert('Record deleted successfully')
            productListing();
        }

    }
    const searchProduct = async (key) => {
        if (key) {
            let result = await fetch(`${API_BASE_URL}/search/${key}`, {
                headers: {
                    authorization: JSON.parse(localStorage.getItem('auth'))
                }
            });
            let resp = await result.json();
            if (resp) {
                setProducts(resp);
            }
        }
        else {
            productListing();
        }

    }

    return (

        <Container style={{ marginTop: '30px' }}>
            <input className='search-box' type='text' placeholder='Search here..' onChange={(e) => searchProduct(e.target.value)}></input>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Company</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length > 0 ?
                            products.map((item, i) =>
                                <tr key={item._id}>
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>$ {item.price}</td>
                                    <td>{item.category}</td>
                                    <td>{item.company}</td>
                                    <td><Link to={`/update/${item._id}`} style={{marginRight:'30px'}}><FontAwesomeIcon icon={faPenToSquare} color='orange' /></Link><button type='link' onClick={() => deleteProduct(item._id)}><FontAwesomeIcon icon={faTrash}color='red' /> </button></td>
                                </tr>
                            ) :

                            <h2 style={{ marginTop: '20px' }}> No Product Found</h2>

                    }


                </tbody>
            </Table>
        </Container>
    )
}
export default Products;
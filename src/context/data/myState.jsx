import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { Timestamp, addDoc, collection, deleteDoc, onSnapshot, orderBy, query, setDoc, doc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';

function myState(props) {
    const [mode, setMode] = useState('light')

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }

        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';

        }
    }
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addProduct = async () => {
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
            return toast.error('Please fill all fields')
        }

        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products);
            toast.success("Add product successfully");
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();

        } catch (error) {
            console.log(error)

        }
    }

    const [product, setProduct] = useState([]);

    const getProductData = async () => {

        try {
            const q = query(
                collection(fireDB, 'products'),
                orderBy('time')
            )

            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productArray)

            });
            return () => data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductData()
    }, []);

    // Update Product
    const edithandle = (item) => {
        setProducts(item)
    }

    const updateProduct = async () => {

        try {
            await setDoc(doc(fireDB, 'products', products.id), products);
            toast.success("Product Updated Successfully");
            getProductData();
            setTimeout(()=>{
                window.location.href = '/dashboard'
            },800);

        } catch (error) {
            console.log(error)

        }
    }

    // Delete Product

    const deleteProduct = async (item) => {

        try {
            await deleteDoc(doc(fireDB, 'products', item.id))
            toast.success("Product Deleted Successfully")
            getProductData();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <MyContext.Provider value={{ mode, toggleMode, loading, setLoading, products, setProducts, addProduct, product, edithandle, updateProduct, deleteProduct}}>
                {props.children}
            </MyContext.Provider>
        </div>
    )
}

export default myState

import React, { useEffect, useState } from 'react'
import './SearchProduct.scss'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProductType, getBrands, getAvailability, getErrors, resetAll, setDataSearch } from '../../action/SearchAction'
import isEmpty from '../../isEmpty'

const SearchProduct = props => {
    const productType = useSelector(state => state.searchReducer.productType)
    const brand = useSelector(state => state.searchReducer.brand)
    const availability = useSelector(state => state.searchReducer.availability)
    const errors = useSelector(state => state.errorReducer.errors)
    const dataSearch = useSelector(state => state.searchReducer.dataSearch)
    const dispatch = useDispatch()
    const [itemsForProduct, setItemsForProduct] = useState([])
    const [itemsForBrand, setItemsForBrand,] = useState([])
    const [itemsForAvailability, setItemsForAvailability] = useState([])

    useEffect(() => {
        dispatch(getProductType())
        dispatch(getBrands())
        dispatch(getAvailability())
        return () => {
            console.log("clean up")
        }
    }, [])

    useEffect(() => {
        if (!isEmpty(productType)) {
            let arr1 = []
            productType.forEach(item => {
                if (dataSearch.product_type_ids.findIndex(element => element === item.id) !== -1) {
                    arr1.push(item.name)
                }
            });
            setItemsForProduct(arr1)
        }
        return () => {
            console.log("clean up")
        }
    }, [productType])

    useEffect(() => {
        if (!isEmpty(brand)) {
            let arr2 = []
            brand.forEach(item => {
                if (dataSearch.brand_ids.findIndex(element => element === item.id) !== -1) {
                    arr2.push(item.name)
                }
            });
            setItemsForBrand(arr2)
        }
        return () => {
            console.log("clean up")
        }
    }, [brand])

    useEffect(() => {
        if (!isEmpty(availability)) {
            let arr3 = []
            availability.forEach(item => {
                if (dataSearch.status.findIndex(element => element === item.id) !== -1) {
                    arr3.push(item.name)
                }
            });
            setItemsForAvailability(arr3)
        }
        return () => {
            console.log("clean up")
        }
    }, [availability])

    const handleChange = e => {
        dispatch(setDataSearch({
            ...dataSearch,
            [e.target.name]: e.target.value
        }))
    }

    const handleResetSelection = () => {
        dispatch(resetAll(dataSearch))
        setItemsForProduct([])
        setItemsForBrand([])
        setItemsForAvailability([])
    }

    const handleSearch = () => {
        dispatch(getErrors(dataSearch, props.history))
    }

    return (
        <div className="settings searchproduct">
            <div className="head flex">
                <Link to="/"><button className="done flex" >
                    <i className="fas fa-chevron-left"></i>
                    Back
                </button></Link>
                <h6>Search Products</h6>
                <button onClick={handleSearch}>Search</button>
            </div>

            <Link to='/selectProduct'>
                <div className="item flex">
                    Product Type
                    <div className="any">
                        <i className="fas fa-chevron-right"></i>
                    </div>
                </div>
                {!isEmpty(itemsForProduct) && itemsForProduct.map((item, index) => <div key={index} className="showItem">{item}<br /></div>)}
            </Link>
            <Link to='/selectBrand'>
                <div className="item flex">
                    Brand
            <i className="fas fa-chevron-right"></i>
                </div>
                {!isEmpty(itemsForBrand) && itemsForBrand.map(item => <div key={item} className="showItem">{item}<br /></div>)}
            </Link>
            <Link to='/selectAvailability'>
                <div className="item flex">
                    Availability
            <i className="fas fa-chevron-right"></i>
                </div>
                {!isEmpty(itemsForAvailability) && itemsForAvailability.map(item => <div key={item} className="showItem">{item}<br /></div>)}
            </Link>
            <div className="item">
                Running
                <div className="running flex">
                    <div className="inputNumber">
                        <input type="number" value={dataSearch.from_use} onChange={handleChange} name="from_use" min='0' />
                        <p>hrs</p>
                    </div>
                    <p className="to">-</p>
                    <div className="inputNumber">
                        <input type="number" value={dataSearch.to_use} onChange={handleChange} name="to_use" min='0' />
                        <p>hrs</p>
                    </div>
                </div>
                {!isEmpty(errors.running) && <p className="error">{errors.running}</p>}
            </div>
            <div className="item year">
                Year
                <div className="running flex">
                    <div className="inputNumber">
                        <input type="number" value={dataSearch.from_year} onChange={handleChange} name="from_year" min={0} />
                    </div>
                    <p className="to">-</p>
                    <div className="inputNumber">
                        <input type="number" value={dataSearch.to_year} onChange={handleChange} name="to_year" min={0} />
                    </div>
                </div>
                {!isEmpty(errors.year) && <p className="error">{errors.year}</p>}
            </div>
            <div className="contact">
                <button className="view" onClick={handleResetSelection}>Reset Selection</button>
            </div>
        </div>
    )
}

export default SearchProduct

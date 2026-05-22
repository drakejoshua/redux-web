import { useDispatch, useSelector } from "react-redux"
import { increment, decrement } from "./app/features/counter/counterSlice"
import { 
    useGetAllProductsQuery, 
    useGetSingleProductQuery,
    useAddNewProductMutation
} from "./app/service/apiData"

export default function App() {
    const dispatch = useDispatch()
    const counter = useSelector((state) => state.counter.value)

    const { data, isError, isLoading } = useGetAllProductsQuery()
    const { data: singleData, isLoading: singleLoading, isError: singleError } = useGetSingleProductQuery(2)

    const [ 
        addNewProduct, 
        { data: addData, error: addError, isLoading: addIsLoading }
    ] = useAddNewProductMutation()

    if ( isError ) {
        return <h1>oh no some error</h1>
    }

    if ( isLoading ) {
        return <h1>loading..</h1>
    }

    async function handleAddProduct() {
        const newProductData = {
            id: 1,
            title: "Amazing T-shirt",
            description: "lorem ipsum dolor sit amet consectcut hello"
        }

        await addNewProduct( newProductData )
    }

    return (
        <div>
            App
            <p>Count: {counter}</p>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>

            <br /> 

            <button onClick={ handleAddProduct } disabled={ addIsLoading }>

            </button>

            <br />

            <details>
                <summary>
                    { singleError && "Error loading product data" }
                    { singleLoading && "loading..." }
                    { singleData?.title }
                </summary>

                <p>
                    { singleData?.description }
                </p>
            </details>


            { data?.products.map( ( product ) => (
                <div>
                    <h2 key={ product.id }>
                        {product.title}
                    </h2>
                    
                    <p>
                        {product.description}
                    </p>
                </div>
            )) }
        </div>
    )
}
import React from "react"
import { Link } from "react-router-dom"
import { BsStarFill } from "react-icons/bs"
import { getHostVans } from "../../api"

export default function Dashboard() {
    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        let isMounted = true
        setLoading(true)
        getHostVans()
            .then((data) => {
                if (isMounted) setVans(data)
            })
            .catch((err) => {
                if (isMounted) setError(err)
            })
            .finally(() => {
                if (isMounted) setLoading(false)
            })

        return () => (isMounted = false)
    }, [])

    function renderVanElements(vans) {
        const hostVansEls = vans.map((van) => (
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
                <Link to={`vans/${van.id}`}>View</Link>
            </div>
        ))

        return (
            <div className="host-vans-list">
                <section>{hostVansEls}</section>
            </div>
        )
    }

    return (
        <>
            <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Welcome!</h1>
                    <p>Income last <span>30 days</span></p>
                    <h2>$2,260</h2>
                </div>
                <Link to="income">Details</Link>
            </section>
            <section className="host-dashboard-reviews">
                <h2>Review score</h2>

                <BsStarFill className="star" />

                <p>
                    <span>5.0</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>
                {loading ? (
                    <h3>Loading...</h3>
                ) : error ? (
                    <h3>There was an error: {error.message}</h3>
                ) : (
                    renderVanElements(vans)
                )}
            </section>
        </>
    )
}

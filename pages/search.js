import Header from "../components/Header"
import Footer from "../components/Footer"
import InfoCard from "../components/InfoCard"
import {useRouter} from "next/dist/client/router"
//libreria para formatear fecha
import {format} from 'date-fns'

 
function Search({ searchResults }) {
const router = useRouter()
const { location, startDate, endDate, noOfGuest} = router.query
 //formateo de fecha
const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
const range = `${formattedStartDate} - ${formattedEndDate}`

return (
        <div className="h-screen">
           <Header placeholder={`${location} | ${range} | ${noOfGuest} guest`}/>
            <main className="flex ">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays - {range} - for {noOfGuest} guest</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}!</h1>

                    <div className="hidden lg:inline-flex mb-5 space-x-3 
                        text-gray-800 whitespace-nowrap">
                        {/* efecto de click botón - global.css */}
                        <p className="button"> Cancelation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Room and Beeds</p>
                        <p className="button">More Filters</p>
                    </div>
                    <div className="flex flex-col">
                        {searchResults.map(({img, location, title, description, star, price, total}) =>(
                            <InfoCard 
                            img={img}
                            location={location}
                            title={title}
                            description={description}
                            star={star}
                            price={price}
                            total={total}
                            />
                        ) )}
                    </div>
                </section>
            </main>
        <Footer />
        </div>
    )
}

export default Search

export async function getServerSideProps() {
    const searchResults = await fetch("https://links.papareact.com/isz").then(
      (res) => res.json()
    );
  
    return {
      props: {
        searchResults,
      },
    };
  }
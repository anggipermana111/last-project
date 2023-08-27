import OrderList from "../components/OrderList";
import Statistics from "../components/Statistics";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full px-10 py-5 overflow-y-scroll">
        <Statistics/>
        <OrderList/>
    </div>
  )
}

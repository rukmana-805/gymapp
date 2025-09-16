import "../AdminDeshboard/AdminDeshboard.css";
import AdminSidebar from "../AdminSide/AdminSide.jsx";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDeshboard = () => {
  const data = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 7000 },
  ];

  return (
    <div>
      <div className="admin-deshboard">
        <AdminSidebar />
        {/* <div className="sidebar-admin">
          
        </div> */}
        <div className="deshboard-content">
          <div className="admin-welcome">
            <h1 style={{fontSize:"35px"}}>Welcome Akash</h1>
            <p>You are Admin</p>
          </div>

          <div className="deshboard-stat">
            <div className="stat-heading">
              <h2>Quick Stat</h2>
            </div>
            <div className="stat-cards">
              <div className="stat-card" id="total-user">
                <h3>Total Users</h3>
                <p>120</p>
              </div>
              <div className="stat-card" id="total-trainner">
                <h3>Total Trainner</h3>
                <p>12</p>
              </div>
              <div className="stat-card" id="active-user">
                <h3>Active Users</h3>
                <p>85</p>
              </div>
              <div className="stat-card" id="today-booking">
                <h3>Today's Booking</h3>
                <p>24</p>
              </div>
              <div className="stat-card" id="revnue-monthly">
                <h3>Monthly Revenue</h3>
                <p>₹18,500</p>
              </div>
            </div>
          </div>

          <div className="deshboard-chat">
            <div className="monthly-revenue-chat">
              <h2>Monthly Revenue Chat</h2>
            </div>
            <div className="barchat">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data}
                  margin={{ top: 25, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="class-booked">
            <div className="recent-class-heading">
              <h2>Recent Class Booked</h2>
            </div>
            <div className="class-table-recent">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Class</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ravi</td>
                    <td>Yoga</td>
                    <td>2025-07-19</td>
                    <td><div className="table-status"><span>Confirm</span></div></td>
                  </tr>
                  <tr>
                    <td>Vijay</td>
                    <td>Yoga</td>
                    <td>2025-07-19</td>
                    <td><div className="table-status"><span>Confirm</span></div></td>
                  </tr>
                  {/* Add more rows later */}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-desh-quick-links">
            <div className="desh-quick-link-heading"><h2>Quick Links</h2></div>
            <div className="links-quick">
                <button>All Customers</button>
                <button>All Booked Class</button>
                <button>All Trainner</button>
                <button>All Schedule</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDeshboard;

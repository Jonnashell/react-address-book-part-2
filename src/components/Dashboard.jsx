import { useContext, useState } from "react"
import { ContactContext } from "../App"
import { useNavigate } from "react-router-dom"

function Dashboard() {

    const { contacts } = useContext(ContactContext)
    const navigate = useNavigate()
    const [filter, setFilter] = useState("")

    const filteredContacts = contacts.filter((c) =>
        `${c.firstName} ${c.lastName}`
            .toLowerCase()
            .includes(filter.toLowerCase())
    )

  return (
    <div>
        <h2 className="dashboard">Dashboard</h2>
        <div style={{ marginLeft: 20}}>
            <h3 className="">Contacts list</h3>
            <input
                type="text"
                placeholder="Search contacts..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                padding: "0.5rem",
                marginLeft: 10,
                marginBottom: "1rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%",
                maxWidth: "300px",
                }}
            />
            <div style={{ display: "grid", gap: "0.5rem"  }}>
                {filteredContacts.map((c) => {
                    return (
                        <li
                            key={c.id}
                            onClick={() => navigate(`/contact/${c.id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            {`${c.firstName} ${c.lastName}`}
                        </li>
                        
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Dashboard
import { useContext } from "react"
import { ContactContext } from "../App"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function ContactProfile() {
    const { id } = useParams()
    const { contacts, setContacts, contact_url } = useContext(ContactContext)
    const contact = contacts.find(c => c.id == id)
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            const response = await fetch(contact_url + '/' + id, {
              method: "DELETE",
              headers: {
                accept: "application/json",
            },
            })
            console.log(contact_url + '/' + id)

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            setContacts((prev) => prev.filter((c) => String(c.id) !== String(id)));
            navigate("/dashboard")
        }
        catch (error) {
            console.error("Failed to create contact", error)
        }
    }

  return (
    <div>
        <h3>Contact profile</h3>
        <div className='contact-info'>
            <strong>Name:</strong> {contact.firstName} {contact.lastName} <br />
            <strong>Street:</strong> {contact.street} <br />
            <strong>City:</strong> {contact.city}
        </div>
        <button 
            onClick={handleDelete}
            style={{
                marginLeft: 10,
                marginTop: 20,
                padding: "0.3rem 0.7rem",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#1976d2",
                color: "white",
                fontSize: "1rem",
                cursor: "pointer"
            }}
        >
            Delete
        </button>
        <button 
            onClick={() => navigate(`/contact/update/${id}`)}
            style={{
                marginLeft: 10,
                marginTop: 20,
                padding: "0.3rem 0.7rem",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#1976d2",
                color: "white",
                fontSize: "1rem",
                cursor: "pointer"
            }}
        >
            Edit
        </button>
    </div>
  )
}

export default ContactProfile
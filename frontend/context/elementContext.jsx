import { createContext, useContext, useMemo, useState } from "react";
import { ElementInfoType } from "@/types/elementInfo";
import { apiUrl } from "@/constants/apiUrl";

const ElementContext = createContext();

export const ElementProvider = ({ children }) => {
    const [elements, setElements] = useState([]);

    const nextElementId = useMemo(() => (elements.length > 0 ? parseInt(elements[elements.length - 1].id) + 1 : 0).toString(), [elements])

    const getElements = async () => {
        try {
            const response = await fetch(`${apiUrl}/planets`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json()
            setElements(data)
        } catch (error) {
            console.error(error)
        }

    }

    const addElement = async (element) => {
        try {
            const response = await fetch(`${apiUrl}/planets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(element),
            })

            if (response.ok) {
                alert('Planet added successfully')
                getElements()
            } else {
                alert('An error occurred')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const editElement = async (element) => {
        try {
            const response = await fetch(`${apiUrl}/planets/${element.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(element),
            })

            if (response.ok) {
                alert('Planet edited successfully')
                setElements(getElements())
            } else {
                alert('An error occurred')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteElement = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/planets/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                alert('Planet deleted successfully')
                await getElements()
            } else {
                alert('An error occurred')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ElementContext.Provider value={{ elements, getElements, addElement, editElement, deleteElement, nextElementId }}>
            {children}
        </ElementContext.Provider>
    )
}

export const useElements = () => {
    return useContext(ElementContext)
}


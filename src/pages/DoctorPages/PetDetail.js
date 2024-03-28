import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import petApi from "../../services/petApi";
import userApi from "../../services/userApi";

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ID from URL:", id);
    const fetchPet = async () => {
      try {
        const response = await petApi.getOne(id);
        console.log("Data of fetching pet by id", response);
        console.log("Data of ownerId", response.ownerId);
        setPet(response);
        setLoading(false);

        if (response && response.ownerId) {
          const ownerResponse = await userApi.getUser();
          console.log("Owner data:", ownerResponse);

          // Find the owner with the matching ID
          const owner = ownerResponse.find(
            (user) => user.id === response.ownerId
          );
          console.log("Filtered owner:", owner);
          setOwner(owner);
        }
      } catch (error) {
        console.error("Error fetching pet:", error);
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pet) {
    return <div>Pet not found!</div>;
  }

  return (
    <div>
      <h2>Pet Detail Page</h2>
      <div>
        <h3>{pet.name}</h3>
        <p>Type: {pet.petType}</p>
        <p>Status: {pet.status}</p>
        <p>DOB: {pet.dob}</p>
        {owner ? (
          <p>
            Owner: {owner.name} (ID: {owner.id})
          </p>
        ) : (
          <p>Owner not found</p>
        )}
      </div>
    </div>
  );
};

export default PetDetail;

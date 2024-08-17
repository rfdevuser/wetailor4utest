"use client";
import { GET_BLOUSE_PRODUCT_BY_ID } from '@/utils/gql/GQL_QUERIES';
import { useQuery } from '@apollo/client';
import React from 'react';
import SingleProductDescriptionPage from '@/components/SingleProductDescriptionPage';

const SingleBlouseDescriptionPage = ({ params }: { params: { id: string } }) => {
    const idParts = params.id.split('-');
    const lastPart = idParts[idParts.length - 1];
    console.log(lastPart, "LastPart");

    const { loading, error, data } = useQuery(GET_BLOUSE_PRODUCT_BY_ID, {
        variables: {
            id: lastPart // Ensure you're using the lastPart instead of hardcoded ID
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occurred: {error.message}</p>;

    const product = data?.product;
    console.log(product);

    return (
        <SingleProductDescriptionPage products={product} />
    );
};

export default SingleBlouseDescriptionPage;

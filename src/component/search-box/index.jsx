import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const SearchBoxComponent = ({ handle }) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    return (
        <form onSubmit={handleSubmit(handle)}>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Type IP address..."
                    aria-label="Type IP address..." aria-describedby="btn-search"
                    {...register("ipAddress")} />
                <button className="btn btn-warning" type="submit" id="btn-search">Search</button>
            </div>
        </form>
    )
}

export default SearchBoxComponent;
import React from 'react';
import { Link } from 'react-router-dom';

const NoCarSelected = () => {
return (
<div className="text-center mt-20 text-xl text-red-600 font-semibold"> NO CAR SELECTED
<br />
<Link to="/" className="text-blue-600 underline">Click here to return to homepage</Link>
</div>
);
};

export default NoCarSelected;
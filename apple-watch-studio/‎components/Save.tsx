'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
const Save = () => {
    const router = useRouter();
        const {
          selectedCase,
          selectedMainBand,
          selectedMainCase,
          selectedBand,
          size,
          collection,
          totalPrice,
          currentSideViewImage,
        } = router.q;
    
        console.log(router.query);
  return (
    <div>
      
    </div>
  )
}
export default Save
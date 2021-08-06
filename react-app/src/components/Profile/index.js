import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getTranslation, getCopywriting, getProofreading} from '../../store/orders';
import { getOrders } from '../../store/orders';
import styles from '../../css-modules/Profile.module.css';
import { editTranslation, editProofreading, editCopywriting} from '../../store/orders';
import { deleteTranslation, deleteProofreading, deleteCopywriting } from '../../store/orders';
import RenderTranslations from './RenderTranslations';
import RenderProofreadings from './RenderProofreadings';
import RenderCopywriting from './RenderCopywritings';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Pagination } from 'swiper';

function User() {
  const dispatch = useDispatch();
  const history = useHistory()
  const orders = useSelector((state) => state.session.user.orders)
  useSelector((state) => console.log(state));
  // useEffect(()=> {
  // }, [state])
  const translations = useSelector((state) => state.session.user.orders.filter(order=>order.translation));
  const proofreadings = useSelector((state) => state.session.user.orders.filter(order => order.proofreading));
  const copywritings = useSelector((state) => state.session.user.orders.filter(order=>order.copywriting));
  


  const editOrder = async (order) => {
    if (order.translation){
      await dispatch(editTranslation(order.translation))
    } else if (order.copywriting){
      await dispatch(editCopywriting(order.copywriting))
    } else if(order.proofreading){
      await dispatch(editProofreading(order.proofreading))
    }
    history.push('/profile')
  }
  const deleteOrder = async (order) => {
    // e.preventDefault()
    if (order.translation) {
      await dispatch(deleteTranslation(order.translation))
    } else if (order.copywriting) {
      await dispatch(deleteCopywriting(order.copywriting))
    } else if (order.proofreading){
      await dispatch(deleteProofreading(order.proofreading))
    }
    history.push('/profile')
  }

  
  return (
    <div className={styles.profileLayout}>
      <label>My Orders:</label>
      <p>Translations</p>
      {translations.length ? (translations.map(translation =>
        <RenderTranslations 
          translation={translation}
          editOrder={editOrder}
          deleteOrder={deleteOrder}/>
  )) : null}

      <p>Proofreading</p>
      {proofreadings.length ? (proofreadings.map(proofreading =>
        <RenderProofreadings
          proofreading={proofreading}
          editOrder={editOrder}
          deleteOrder={deleteOrder} />
      )) : null}
      <p>Copy</p>
      {copywritings.length ? (copywritings.map(copywriting =>
        <RenderCopywriting
          copywriting={copywriting}
          editOrder={editOrder}
          deleteOrder={deleteOrder} />
      )) : null}
    </div>
  );
}
export default User;

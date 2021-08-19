import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTranslation, getCopywriting, getProofreading } from '../../store/orders';
import { getOrders } from '../../store/orders';
import styles from '../../css-modules/Profile.module.css';
import { editTranslation, editProofreading, editCopywriting } from '../../store/orders';
import { deleteTranslation, deleteProofreading, deleteCopywriting } from '../../store/orders';
import RenderTranslations from './RenderTranslations';
import RenderProofreadings from './RenderProofreadings';
import RenderCopywriting from './RenderCopywritings';
// import Translation from '../Order/Translation';

function User() {
  const dispatch = useDispatch();
  const history = useHistory()
  const userId = useSelector((state) => state.session.user.id);
  // const orders = useSelector((state) => state.session.user.orders)
  // useSelector((state) =>console.log("this is current state", state));
  
  
  // const translations = useSelector((state) => state.session.user.orders.filter(order => order.translation));
  // const proofreadings = useSelector((state) => state.session.user.orders.filter(order => order.proofreading));
  // const copywritings = useSelector((state) => state.session.user.orders.filter(order => order.copywriting));
  useEffect(() => {
    dispatch(getOrders(userId))
  }, [userId, dispatch])
  const orders2 = useSelector((state) => state?.orders)
  console.log('orders2', orders2);

  // const editOrder = async (order) => {
  //   if (order.translation) {
  //     await dispatch(editTranslation(order.translation))
  //   } else if (order.copywriting) {
  //     await dispatch(editCopywriting(order.copywriting))
  //   } else if (order.proofreading) {
  //     await dispatch(editProofreading(order.proofreading))
  //   }
  //   // window.location.reload(false);
  //   history.push('/profile')
  // }
  // const deleteOrder = async (order) => {
  //   // e.preventDefault()
  //   if (order.translation) {
  //     await dispatch(deleteTranslation(order.translation))
  //   } else if (order.copywriting) {
  //     await dispatch(deleteCopywriting(order.copywriting))
  //   } else if (order.proofreading) {
  //     await dispatch(deleteProofreading(order.proofreading))
  //   }
  //   window.location.reload(false);
  //   history.push('/profile')
  // }


  return (
    <div className={styles.orderDisplay}>
      <label className={styles.serviceDisplay}>My Orders:</label>
      {/* {!translations?.length && !proofreadings.length && !copywritings.length ? <p>None</p> : null}
        <div className={styles.profileLayout}>
          <div className={styles.serviceDiv}>
            {translations.length ? <p className={styles.serviceLabel}>Translations</p> : null}
            {translations.length ? (translations.map(translation =>
              <RenderTranslations
                key={translation.id}
                translation={translation}
                editOrder={editOrder}
                deleteOrder={deleteOrder} />
            )) : null}
          </div>
          <div className={styles.serviceDiv}>
            {proofreadings?.length ? <p className={styles.serviceLabel}>Proofreadings</p> : null}
            {proofreadings?.length ? (proofreadings.map(proofreading =>
              <RenderProofreadings
                key={proofreading.id}
                proofreading={proofreading}
                editOrder={editOrder}
                deleteOrder={deleteOrder} />
            )) : null}
          </div>
          <div className={styles.serviceDiv}>
            {copywritings?.length ? <p className={styles.serviceLabel}>Copywriting</p> : null}
            {copywritings?.length ? (copywritings.map(copywriting =>
              <RenderCopywriting
                key={copywriting.id}
                copywriting={copywriting}
                editOrder={editOrder}
                deleteOrder={deleteOrder} />
            )) : null}
          </div>
        </div>*/}
    </div> 
  );
}
export default User;
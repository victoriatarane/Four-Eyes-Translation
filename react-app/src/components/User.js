import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getTranslation, getCopywriting, getProofreading} from '../store/orders';
import { getOrders } from '../store/orders';
import styles from '../css-modules/Profile.module.css';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Pagination } from 'swiper';

function User() {
  const dispatch = useDispatch()
  const translations = [];
  const copywritings = [];
  const proofreadings = [];
  const orders = useSelector((state) => state.session.user.orders);
  orders.forEach((order) => {
    if (order.translation) {
      translations.push(order.translation)
      
    }
    if (order.copywriting) {
      copywritings.push(order.copywriting)
      
    }
    if (order.proofreading) {
      proofreadings.push(order.proofreading)
      
    }
  })
  console.log("1", translations)
  console.log("2", copywritings)
  console.log("3", proofreadings)
  // useEffect(() => {
  //   const orders = dispatch(getOrders(userId))
  //   console.log(orders)
  // }, [dispatch]);

  
  return (
    <div className={styles.profileLayout}>
      <label>My Orders:</label>
      <p>Translations</p>
      {translations.length ? (translations.map(translation =>
      <ul key={translation.id}>
        <li>Document: {translation.document_url}</li>
        <li>Field: {translation.field}</li>
        <li>Word count: {translation.word_count}</li>
        <li>Source language: {translation.source_language}</li>
        <li>Target language: {translation.target_language}</li>
        <li>Date created: {translation.created_at}</li>
        </ul>
  )) : null}

      <p>Proofreading</p>
      {proofreadings.length ? (proofreadings.map(proofreading =>
        <ul key={proofreading.id}>
          <li>Document: {proofreading.document_url}</li>
          <li>Field: {proofreading.field}</li>
          <li>Word count: {proofreading.word_count}</li>
          <li>Language: {proofreading.language}</li>
          <li>Date created: {proofreading.created_at}</li>
          </ul>
      )) : null}
      <p>Copy</p>
      {copywritings.length ? (copywritings.map(copywriting =>
        <ul key={copywriting.id}>
          <li>Description: {copywriting.description}</li>
          <li>Key words: {copywriting.key_words}</li>
          <li>Links: {copywriting.links}</li>
          <li>Field: {copywriting.field}</li>
          <li>Word count: {copywriting.word_count}</li>
          <li>Language: {copywriting.language}</li>
          <li>Date created: {copywriting.created_at}</li>
          </ul>
      )) : null}
    </div>
  );
}
export default User;

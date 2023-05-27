import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MenuDetailView({ menu }) {
  const [isLoading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const res = await axios
          .get(`https://siksha-api.wafflestudio.com/reviews/?menu_id=${menu.id}&page=1&per_page=5`)
          .then((res) => {
            setReviews(res.data.result);
          });
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
    fetchReviews();
  }, [menu.id, setLoading]);
  return (
    !isLoading && (
      <Info>
        <div>
          {menu.name_kr}
          {reviews.map((review) => (
            <div key={review.id}>{review.comment}</div>
          ))}
        </div>
      </Info>
    )
  );
}

const Info = styled.div`
  display: flex;
  z-index: 100;
`;




import React, { Component } from "react";
import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import Slider from "react-slick";
import image from "../../../../assets/login.png"
import { Columns } from "lucide-react";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { primaryColor } from "../../../../constants/Colors";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeroCompanyCard from "../../../../components/HomePageComponents/Hero/HeroCompanyCards";
import Google from "../../../../assets/google-logo-history-png-2609.png";
import Microsoft from "../../../../assets/microsoft-logo-png-2411 (1).png";
import OpenAI from "../../../../assets/logo-chatgpt-png-42635.png";
import Youtube from "../../../../assets/youtube-logo-png-2083.png";
import Threads from "../../../../assets/threads-logo-42594.png";
import Twitter from "../../../../assets/twitter-x-logo-42561.png";
import Spotify from "../../../../assets/spotify-logo-png-7081.png";
export default class Patners extends Component {

  render() {
    const testimonalData = [
     
      {
        name: "Technovative Solutions",
        logo: "https://amberstore.pk/uploads/1711416871-548928195-images-removebg-preview.png",
      },
      {
        name: "Creative Design",
        logo: "https://amberstore.pk/uploads/1711417025-117437820-creative-removebg-preview.png",
      },
      {
        name: "Royal Tech",
        logo: "https://amberstore.pk/uploads/1711417186-297532751-89-removebg-preview.png",
      },
      {
        name: "U & T",
        logo: " https://amberstore.pk/uploads/1711417614-892728964-44-removebg-preview.png",
      },

      {
        name: "Metrics Mechanical",
        logo: "  https://amberstore.pk/uploads/1711418118-643878054-46-removebg-preview.png",
      },
      {
        name: "Abtach Technologies",
        logo: " https://amberstore.pk/uploads/1711418359-589504313-36-removebg-preview.png",
      },
     
    ]
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };

    return (
      <div>
        <div className="container p-5">
          <Slider {...settings}>
            {testimonalData.map((item, index) => (
              <Grid item xs={12} md={2} key={index}>
                <div style={{ width: "180px" }}>
                  <HeroCompanyCard item={item} />
                </div>
              </Grid>
              //           <div className="card p-4" key={index}>
              //      <span className="fw-bold" color={primaryColor}><FormatQuoteIcon className="fs-1 mb-2"/></span>
              //    <h6>{item.desc}</h6>
              //    <div className="d-flex align-items-center gap-3">
              //      {/* <img src={item.img} alt="image" className="" style={{maxWidth:"80px"}} /> */}
              //      <span className=""><AccountCircleIcon className="fs-1 text-secondary"/></span>
              //     <div className="text-start" style={{display:"flex", flexDirection:"column"}}>
              //    <span className="text-start fw-bold">{item.name}</span>
              //    <span className="fw-light">{item.profession}</span>
              //     </div>
              //    </div>
              //   </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}
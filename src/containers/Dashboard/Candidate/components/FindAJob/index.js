import { Flag, LocationCity, LocationOn, Lock, Search } from "@mui/icons-material"
import { Box, Container, Grid, Typography } from "@mui/material"
import { fontSize } from "@mui/system"
import IconButton from "../../../../../components/IconButton"
import JobsCard from "../../../../../components/JobsCard"
import TextInput from "../../../../../components/TextInput"
import { headerColor, priceColor, primaryColor, textColor } from "../../../../../constants/Colors"
import useStyles from "../../../../../styles"
import { getJobs, addFavouriteJob, removeFavouriteJob, applyJob } from "../../../../../services/Jobs"
import { useContext, useLayoutEffect } from "react"
import { useState } from "react"
import { AppContext } from "../../../../../context"
import { useSnackbar } from "notistack"
import { Navigate, useLocation } from "react-router-dom"
const FindAJob = () => {
    const { user,selectedCoverLetter,selectedTemplate } = useContext(AppContext);

    const classes = useStyles()
    const location = useLocation()
    let searchValue = location?.state?.searchValue

    const [jobsData, setJobsData] = useState([])
    const [search, setSearch] = useState({
        jobTitle: "",
        location: "",
    })

    const handleChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const { enqueueSnackbar } = useSnackbar()




    // const jobsData = [
    //     {
    //         id: 1,
    //         title: "Junior Node Js Developer",
    //         company: "Quanrio LLP",
    //         salary: 300000,
    //         jobType: "Full Time",
    //         isUrgentHiring: true,
    //         isHiringMultiple: false,
    //         description: "Building interactive consumer data from multiple systems and RESTfully abstracting to the UI through a Node.js backend. Define code architecture decisions to support a high-performance and scalable product with a minimal footprint.",
    //         postedDays: 30,
    //         qualification: "Bachelor in Computer Science",
    //         experience: " Minmum 1 year experience",
    //         responsibilities: "Handson Expereience Node.Js, React, Tailwind, Redux.",
    //         skills: "Solid capability of JavaScript, involving DOM control and the JavaScript object model.",
    //         benefits: "Monthly Performance Based Bonuses.",
    //         timing: "9:00 am to 6:30 pm",
    //         jobType: "Full-time",
    //         Location: "Karachi",
    //         candidateCount: 4
    //     },
    //     {
    //         id: 2,
    //         title: "Front End Developer",
    //         company: "Horizon Technologies",
    //         salary: 600000,
    //         jobType: "Full Time",
    //         isUrgentHiring: true,
    //         isHiringMultiple: true,
    //         description: "Horizon Technologies is looking for a Front-End Developer for our software team. The candidate must have exposure and interest in UI / UX Front end development. Candidates should UI development skills and have good design concepts.",
    //         postedDays: 1,
    //         qualification: "Bachelor in Computer Science",
    //         experience: " Minmum 2 year experience",
    //         responsibilities: "Real enthusiasm and passion for front end development",
    //         skills: "HTML5, Bootstrap, JavaScript, jQuery,UI patterns",
    //         benefits: "",
    //         timing: "",
    //         jobType: "Full-time",
    //         Location: "Lahore",
    //         candidateCount: 2

    //     },
    //     {
    //         id: 3,
    //         title: "React Developer (Morning shift)",
    //         company: "Nixaam",
    //         salary: 100000,
    //         jobType: "Full Time",
    //         isUrgentHiring: false,
    //         isHiringMultiple: true,
    //         description: "NiXaam LLC is searching for talented React Developer. Professionals to join our team. You will guarantee that these parts and the general application are powerful and simple to keep up with. If you are capable enough to be part of a winning team then join us to boost your career.",
    //         postedDays: 2,
    //         qualification: "Bachelor in Computer Science",
    //         experience: " Minmum 1 year experience",
    //         responsibilities: "Handson Expereience Node.Js, React, Tailwind, Redux.",
    //         skills: "Solid capability of JavaScript, involving DOM control and the JavaScript object model.",
    //         benefits: "Monthly Performance Based Bonuses.",
    //         timing: "9:00 am to 6:30 pm",
    //         jobType: "Full-time",
    //         Location: "Karachi",
    //         candidateCount: 3

    //     },
    // ]

    useLayoutEffect(() => {
        getJobsData(
            searchValue?.keyword ? searchValue?.keyword : "",
            searchValue?.location ? searchValue?.location : "",
            searchValue?.experience ? searchValue?.experience : "",
            searchValue?.jobDescription ? searchValue?.jobDescription : ""
        )
    }, [])


    const getJobsData = async (jobTitle, location, experience, jobDescripion) => {
        try {
            const response = await getJobs(jobTitle, location, experience, jobDescripion)
            setJobsData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = async () => {
        const { jobTitle, location } = search
        try {
            const response = await getJobs(jobTitle, location)
            setJobsData(response.data.data)
        } catch (error) {
            console.log(error)
        }

    }

    const handleAddFavourite = async (jobId) => {
        if (!user) {
            enqueueSnackbar("Please Login First", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
            return <Navigate to="/login" />
        } else {
            try {
                let payload = {
                    jobId: jobId,
                    userId: user?._id
                }
                const response = await addFavouriteJob(payload)
                if (response.data.status === "ok") {
                    enqueueSnackbar(response.data.message, {
                        variant: "success",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    })
                    getJobsData(
                        searchValue?.keyword ? searchValue?.keyword : "",
                        searchValue?.location ? searchValue?.location : "",
                        searchValue?.experience ? searchValue?.experience : "",
                        searchValue?.jobDescription ? searchValue?.jobDescription : ""
                    )
                } else {
                    enqueueSnackbar(response.data.message, {
                        variant: "error",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    })
                }
            } catch (error) {
                enqueueSnackbar(error.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })

            }
        }

    }

    const handleRemoveFavourite = async (jobId) => {
        if (!user) {
            enqueueSnackbar("Please Login First", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
            return <Navigate to="/login" />
        } else {
            try {
                let payload = {
                    jobId: jobId,
                    userId: user?._id
                }
                const response = await removeFavouriteJob(payload)
                if (response.data.status === "ok") {
                    enqueueSnackbar(response.data.message, {
                        variant: "success",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    })
                    getJobsData(
                        searchValue?.keyword ? searchValue?.keyword : "",
                        searchValue?.location ? searchValue?.location : "",
                        searchValue?.experience ? searchValue?.experience : "",
                        searchValue?.jobDescription ? searchValue?.jobDescription : ""
                    )
                } else {
                    enqueueSnackbar(response.data.message, {
                        variant: "error",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    })
                }
            } catch (error) {
                enqueueSnackbar(error.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })

            }
        }

    }

    const handleApplyJob = async (jobId, companyId) => {
        if (!user) {
            enqueueSnackbar("Please Login First", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
            return <Navigate to="/login" replace />
        } else if (user && user.role === "Organization") {
            enqueueSnackbar("organization can not apply for jobs", {
                variant: "error",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
        }else {
            try {
                if (selectedCoverLetter && selectedTemplate) {
                    let payload = {
                        jobId: jobId,
                        userId: user?._id,
                        companyId: companyId
                    }
                    const response = await applyJob(payload)
                    if (response.data.status === "ok") {
                        enqueueSnackbar(response.data.message, {
                            variant: "success",
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right',
                            }
                        })
                        getJobsData(
                            searchValue?.keyword ? searchValue?.keyword : "",
                            searchValue?.location ? searchValue?.location : "",
                            searchValue?.experience ? searchValue?.experience : "",
                            searchValue?.jobDescription ? searchValue?.jobDescription : ""
                        )
                    } else {
                        enqueueSnackbar(response.data.message, {
                            variant: "error",
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right',
                            }
                        })
                    }
                }else{
                    enqueueSnackbar("Please Select Resume & Cover Letter Template First", {
                        variant: "error",
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                        }
                    })
                }
                
            } catch (error) {
                enqueueSnackbar(error.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })

            }
        }

    }

    return (
        <Box component="div">
            <Box component="div" sx={{
                background: primaryColor,
                padding: "20px",
            }}>
                <Container maxWidth="xl">
                    <Typography variant="h1" className={classes.loginHeading}>
                        Jobs
                    </Typography>
                </Container>
            </Box>
            <Container maxWidth="xl">

                <Grid container marginTop={3} spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextInput
                            value={search.jobTitle}
                            onChange={(e) => handleChange(e)}
                            name="jobTitle"
                            sx={{ marginTop: "10px" }} type="icon" startIcon
                            startIconContent={<Typography sx={{ fontSize: "14px", margin: "0px 10px", fontWeight: "600 !important" }} variant="h2" className={classes.heroSubHeading}>What</Typography>}
                            icon={<Search sx={{
                                color: textColor,
                                marginRight: "10px",
                            }} />} className={classes.heroInput} placeholder="Job title, keywords, or company" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextInput
                            value={search.location}
                            onChange={(e) => handleChange(e)}
                            name="location"
                            sx={{ marginTop: "10px" }} type="icon" startIcon
                            startIconContent={<Typography sx={{ fontSize: "14px", margin: "0px 10px", fontWeight: "600 !important" }} variant="h2" className={classes.heroSubHeading}>Where</Typography>}
                            icon={<LocationOn sx={{
                                color: textColor,
                                marginRight: "10px",
                            }} />} className={classes.heroInput} placeholder="Location" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <IconButton
                            onClick={handleSearch}
                            className={classes.heroBtn} width={"40%"}>
                            Find Jobs
                        </IconButton>
                    </Grid>
                </Grid>
                <Box component="div" sx={{ textAlign: "center", marginTop: "30px" }}>
                    <Typography
                        sx={{
                            fontSize: "35px !important",
                            fontWeight: "600 !important",
                            borderBottom: "5px solid",
                            borderColor: primaryColor,
                            width: "16%",
                            paddingBottom: "18px",
                            margin: "0 auto"
                        }}
                        variant="h1" className={classes.heroHeading}>
                        Job Feed
                    </Typography>
                </Box>
                <Box sx={{ marginTop: "30px" }}>
                    <JobsCard job={jobsData} handleAddFavourite={handleAddFavourite} handleRemoveFavourite={handleRemoveFavourite} handleApplyJob={handleApplyJob} />
                </Box>
            </Container>
        </Box>
    )
}

export default FindAJob
const profileDataArgs = process.argv.slice(2, process.argv.length);

const printProfileData = profileDataArg =>
{
    for(let i =0;i<profileDataArg.length;i++)
    {
        console.log(profileDataArg[i]);
    }

    console.log("===================");

    profileDataArg.forEach(profileItem => console.log(profileItem));
}

printProfileData(profileDataArgs);
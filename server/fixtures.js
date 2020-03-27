const mongoose = require('mongoose');
const config = require('./config');
const nanoid = require('nanoid');

const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');
const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();
    for (let collection of collections) {
        await collection.drop();
    }

    await User.create({
        username: 'user',
        password: '123',
        role: 'user',
        token: nanoid(),
    }, {
        username: 'admin',
        password: '123',
        role: 'admin',
        token: nanoid(),
    });

    let artists = await Artist.create(
        {title: 'Beatles', image: 'beatles.jpeg', description: 'Legendary British band'},
        {title: 'Melnitsa', image: 'melnitsa.jpg', description: 'Russian folk-group'},
    );

    let albums = await Album.create(
        {
            title: 'Please Please Me',
            artist: artists[0]._id,
            issueDate: '1963',
            image: 'please_please_me.jpg'
        },
        {
            title: 'With the Beatles',
            artist: artists[0]._id,
            issueDate: '1963',
            image: 'with_the_beatles.jpg'
        },
        {
            title: 'Pereval',
            artist: artists[1]._id,
            issueDate: '2005',
            image: 'pereval.jpg'
        },
        {
            title: 'Zov krovi',
            artist: artists[1]._id,
            issueDate: '2006',
            image: 'zov_krovi.jpg'
        },
    );

    await Track.create(
        {
            title: 'I saw her standing there',
            album: albums[0]._id,
            duration: '2:55',
            sequence: 1
        },
        {
            title: 'Misery',
            album: albums[0]._id,
            duration: '1:49',
            sequence: 2
        },
        {
            title: 'Anna (Go to him)',
            album: albums[0]._id,
            duration: '2:55',
            sequence: 3
        },
        {
            title: 'Chains',
            album: albums[0]._id,
            duration: '2:23',
            sequence: 4
        },
        {
            title: 'Boys',
            album: albums[0]._id,
            duration: '2:24',
            sequence: 5
        },
        {
            title: 'Ask me why',
            album: albums[0]._id,
            duration: '2:24',
            sequence: 6
        },
        {
            title: 'Please please me',
            album: albums[0]._id,
            duration: '1:59',
            sequence: 7
        },
        {
            title: 'Love me do',
            album: albums[0]._id,
            duration: '2:21',
            sequence: 8
        },
        {
            title: 'P.S. I love you',
            album: albums[0]._id,
            duration: '2:04',
            sequence: 9
        },
        {
            title: "Baby it's you",
            album: albums[0]._id,
            duration: '2:40',
            sequence: 10
        },
        {
            title: 'Do you want to know a secret',
            album: albums[0]._id,
            duration: '1:56',
            sequence: 11
        },{
            title: 'A taste of honey',
            album: albums[0]._id,
            duration: '2:03',
            sequence: 12
        },
        {
            title: "There's a place",
            album: albums[0]._id,
            duration: '1:51',
            sequence: 13
        },
        {
            title: 'Twist and shout',
            album: albums[0]._id,
            duration: '2:32',
            sequence: 14
        },
        {
            title: "It won't be long",
            album: albums[1]._id,
            duration: "2:13",
            sequence: 1
        },
        {
            title: "All I've got to do",
            album: albums[1]._id,
            duration: "2:02",
            sequence: 2
        },
        {
            title: "All my loving",
            album: albums[1]._id,
            duration: "2:07",
            sequence: 3
        },
        {
            title: "Don't bother me",
            album: albums[1]._id,
            duration: "2:28",
            sequence: 4
        },
        {
            title: "Little child",
            album: albums[1]._id,
            duration: "1:46",
            sequence: 5
        },
        {
            title: "Till there was you",
            album: albums[1]._id,
            duration: "2:14",
            sequence: 6
        },
        {
            title: "Please mr.Postman",
            album: albums[1]._id,
            duration: "2:34",
            sequence: 7
        },
        {
            title: "Roll over Beethoven",
            album: albums[1]._id,
            duration: "2:45",
            sequence: 8
        },
        {
            title: "Hold me tight",
            album: albums[1]._id,
            duration: "2:32",
            sequence: 9
        },
        {
            title: "You really got a hold on me",
            album: albums[1]._id,
            duration: "3:01",
            sequence: 10
        },
        {
            title: "I wanna be your man",
            album: albums[1]._id,
            duration: "1:59",
            sequence: 11
        },
        {
            title: "Devil in her heart",
            album: albums[1]._id,
            duration: "2:26",
            sequence: 12
        },
        {
            title: "Not a second time",
            album: albums[1]._id,
            duration: "2:07",
            sequence: 13
        },
        {
            title: "Money (That's what I want)",
            album: albums[1]._id,
            duration: "2:49",
            sequence: 14
        },
        {
            title: "Nochnaya kobyla",
            album: albums[2]._id,
            duration: "4:04",
            sequence: 1
        },
        {
            title: "Gospodin gornyh dorog",
            album: albums[2]._id,
            duration: "5:18",
            sequence: 2
        },
        {
            title: "Vesna",
            album: albums[2]._id,
            duration: "3:43",
            sequence: 3
        },
        {
            title: "Fuga",
            album: albums[2]._id,
            duration: "3:16",
            sequence: 4
        },
        {
            title: "Chujoi",
            album: albums[2]._id,
            duration: "4:32",
            sequence: 5
        },
        {
            title: "Voron",
            album: albums[2]._id,
            duration: "5:16",
            sequence: 6
        },
        {
            title: "Golem",
            album: albums[2]._id,
            duration: "2:06",
            sequence: 7
        },
        {
            title: "Mertvec",
            album: albums[2]._id,
            duration: "3:55",
            sequence: 8
        },
        {
            title: "Veresk",
            album: albums[2]._id,
            duration: "4:11",
            sequence: 9
        },
        {
            title: "Pryalka",
            album: albums[2]._id,
            duration: "6:14",
            sequence: 10
        },
        {
            title: "Korolevna",
            album: albums[2]._id,
            duration: "5:13",
            sequence: 11
        },
        {
            title: "Veresk (Inst.ver.)",
            album: albums[2]._id,
            duration: "4:14",
            sequence: 12
        },
        {
            title: "Nevesta Poloza",
            album: albums[3]._id,
            duration: "4:32",
            sequence: 1
        },
        {
            title: "Zov krovi",
            album: albums[3]._id,
            duration: "3:59",
            sequence: 2
        },
        {
            title: "Dveri Tamerlana",
            album: albums[3]._id,
            duration: "3:29",
            sequence: 3
        },
        {
            title: "Travushka",
            album: albums[3]._id,
            duration: "3:55",
            sequence: 4
        },
        {
            title: "Sestra",
            album: albums[3]._id,
            duration: "3:32",
            sequence: 5
        },
        {
            title: "Polnolunie",
            album: albums[3]._id,
            duration: "4:14",
            sequence: 6
        },
        {
            title: "Skazka o Diavole",
            album: albums[3]._id,
            duration: "6:41",
            sequence: 7
        },
        {
            title: "Drakon",
            album: albums[3]._id,
            duration: "3:59",
            sequence: 8
        },
        {
            title: "Ai, volna",
            album: albums[3]._id,
            duration: "4:15",
            sequence: 9
        },
        {
            title: "Voroji",
            album: albums[3]._id,
            duration: "3:40",
            sequence: 10
        },
        {
            title: "Ogon'",
            album: albums[3]._id,
            duration: "5:03",
            sequence: 11
        },
        {
            title: "Lenta v volosah",
            album: albums[3]._id,
            duration: "3:05",
            sequence: 12
        },
        {
            title: "Belaya koshka",
            album: albums[3]._id,
            duration: "4:41",
            sequence: 13
        },
        {
            title: "Rapunzel",
            album: albums[3]._id,
            duration: "2:26",
            sequence: 14
        },

    );

    await connection.close();
};

run().catch(error => {
    console.error('Something went wrong', error);
});
import cron from 'cron'
import { Seance } from './models/seance';
import moment from 'moment'
import nodemailer from "nodemailer";

const today = moment().startOf('day')

const CronJob = cron.CronJob;
export var job = new CronJob(
    '0 0 0 * * *',
    async () => {
        const seances = await Seance.find(
            {
                date: {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf('day').add(1, 'days').toDate()
                }
            }
        ).populate("coach").populate("joueur")

        seances.forEach((seance) => {
            try {

                let smtpTransport = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "nodeisamm@gmail.com",
                        pass: "otaku666",
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                });

                let mailOptions = {
                    from: "nodeisamm@gmail.com",
                    to: `${seance.joueur.email}`,
                    subject: `seance ${seance.titre} est proche`,
                    text: "test",
                    html: `<h3> Approche d'une seance  </h3> 
                      <div>
                       <h5> votre seance de coach ${seance.coach.firstName} ${seance.coach.lasName} est proche</h5>
                       <p> date: ${moment(seance.date).format('DD-MM-YYYY hh:mm')}</p>
                       </div>`

                };

                smtpTransport.sendMail(mailOptions, (error, res) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log({ message: "Sucess", joueur });
                    }
                });

                smtpTransport.close();
            } catch (error) {
                console.log(error)

            }
        })
    },
    null,
    true,
    'Africa/Tunis'
);
job.start()
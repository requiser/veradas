import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Reservation } from "../entity/Reservation";
import { Donor } from "../entity/Donor";
import { Location } from "../entity/Location";

export class ReservationController extends Controller {
    repository = AppDataSource.getRepository(Reservation);
    donorRepository = AppDataSource.getRepository(Donor);
    locationRepository = AppDataSource.getRepository(Location);

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as Reservation);

            const donor = await this.donorRepository.findOne({
                where: { id: entity.donor.id }
            });
            if (!donor) {
                return this.handleError(res, null, 404, 'A donor nem létezik.');
            }

            const location = await this.locationRepository.findOne({
                where: { id: entity.location.id }
            });
            if (!location) {
                return this.handleError(res, null, 404, 'A helyszín nem létezik.');
            }

            const insertedEntity = await this.repository.save(entity);
            res.json(insertedEntity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getReservationsOfDonor = async (req, res) => {
        try {
            const donorId = req.params.donorId;

            // select reservations where source.id = donorId or destination.id = donorId
            const reservation = await this.repository.find({
                where: [
                    { donor: { id: donorId } }
                ]
            });

            res.json(reservation);
        } catch (err) {
            this.handleError(res, err);
        }
    };
    getReservationsOfLocation = async (req, res) => {
        try {
            const locationId = req.params.locationId;

            // select reservations where source.id = donorId or destination.id = donorId
            const reservation = await this.repository.find({
                where: [
                    { location: { id: locationId } }
                ]
            });

            res.json(reservation);
        } catch (err) {
            this.handleError(res, err);
        }
    };
    update = async (req, res) => {
        try {
            const id = req.body.id;

            let entity = await this.repository.findOneBy({ id });
            if (!entity) {
                return this.handleError(res, null, 404, "No entity found with the given id.");
            }

            entity = this.repository.create(req.body as object);

            const insertedEntity = await this.repository.save(entity);
            res.json(insertedEntity);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}

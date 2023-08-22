<?php

namespace App\DataFixtures;

use App\Entity\Lesson;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class LessonFixtures extends Fixture implements DependentFixtureInterface
{
    const NB_LESSON = 30;
    
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        $lessonAd = new Lesson();
        $lessonAd->setUser($this->getReference(UserFixtures::AD));
        $lessonAd->setSheet($this->getReference(SheetFixtures::COPRO));
        $lessonAd->setBookingDateEntry("2023-01-01");
        $lessonAd->setMasterValidate(true);
        $lessonAd->setPadawanValidate(false);
        $manager->persist($lessonAd);

        $lessonAd = new Lesson();
        $lessonAd->setUser($this->getReference(UserFixtures::ADMIN));
        $lessonAd->setSheet($this->getReference(SheetFixtures::COPRO));
        $lessonAd->setBookingDateEntry("2023-01-01");
        $lessonAd->setMasterValidate(true);
        $lessonAd->setPadawanValidate(false);
        $manager->persist($lessonAd);

        $lessonAd = new Lesson();
        $lessonAd->setUser($this->getReference(UserFixtures::ADMIN));
        $lessonAd->setSheet($this->getReference(SheetFixtures::COPRO));
        $lessonAd->setBookingDateEntry("2024-01-01");
        $lessonAd->setMasterValidate(true);
        $lessonAd->setPadawanValidate(false);
        $manager->persist($lessonAd);

        $lessonAd = new Lesson();
        $lessonAd->setUser($this->getReference(UserFixtures::ADMIN));
        $lessonAd->setSheet($this->getReference(SheetFixtures::COPRO));
        $lessonAd->setBookingDateEntry("2023-01-01");
        $lessonAd->setMasterValidate(false);
        $lessonAd->setPadawanValidate(false);
        $manager->persist($lessonAd);

        $lessonAd = new Lesson();
        $lessonAd->setUser($this->getReference(UserFixtures::ADMIN));
        $lessonAd->setSheet($this->getReference(SheetFixtures::COPRO));
        $lessonAd->setBookingDateEntry("2024-01-01");
        $lessonAd->setMasterValidate(false);
        $lessonAd->setPadawanValidate(false);
        $manager->persist($lessonAd);

        /* 
        for ($i = 1 ; $i <= self::NB_LESSON ; $i++) {
            $lesson[$i] = new Lesson();
            $lesson[$i]->setUser($this->getReference("user".mt_rand(2,(UserFixtures::NB_USER))));
            $lesson[$i]->setSheet($this->getReference("sheet".mt_rand(1,(SheetFixtures::NB_SHEET))));
            $lesson[$i]->setBookingDateEntry(($faker->date('Y-m-d')));
            $manager->persist($lesson[$i]);
        }
        */

        $manager->flush();
    }

    public function getDependencies ()
    {
        return [
            UserFixtures::class,
            SheetFixtures::class,
        ];
    }
}

/*///
{
  "email": "ad@ad.com",
  "password": "Password.0"
}
///*/

/*///
{
  "user": "/api/users/ad-ad",
  "sheet": "/api/sheets/coproterie",
  "bookingDateEntry": "2023-08-19",
  "padawanValidate": true,
  "masterValidate": true
}
///*/
<?php

namespace App\DataFixtures;

use App\Entity\Lesson;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class LessonFixtures extends Fixture implements DependentFixtureInterface
{
    
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 1; $i <= count(UserFixtures::USERARRAY); $i++) {
            $lesson[$i] = new Lesson();
            $lesson[$i]->setUser($this->getReference(UserFixtures::USERARRAY[$i - 1]));
            $lesson[$i]->setSheet($this->getReference(SheetFixtures::SHEETARRAY[$i - 1]));
            $lesson[$i]->setBookingDate($faker->dateTimeThisMonth());
            $manager->persist($lesson[$i]);
        }

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
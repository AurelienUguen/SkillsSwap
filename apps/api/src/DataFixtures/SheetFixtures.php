<?php

namespace App\DataFixtures;

use App\Entity\Sheet;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Faker;

class SheetFixtures extends Fixture implements DependentFixtureInterface
{
    const NB_SHEET = 10;
    const LANGUAGE = [
        "Français",
        "Anglais",
        "Belge",
        "Chypriote",
        "Koréen",
        "Congolais"
    ];
    const PICS_URL = "https://source.unsplash.com/random/400x400/?";
    const CAT_PICS = [
        /*/////////
        'bricolage',
        'arts plastiques',
        'musique',
        'informatique',
        /*/////////
        "lingerie",
        "heels",
        'poterie',
        'infographie',
        'blender',
        'batterie',
        'saucisse',
        'carton',
        'meat',
        "car",
    ];
    const COPRO = 'Coproterie';

    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        $sheetAdmin = new Sheet();
        $sheetAdmin->setTitle('Coproterie');
        $sheetAdmin->setTokenPrice(3);
        $sheetAdmin->setUser($this->getReference(UserFixtures::ADMIN));
        $sheetAdmin->setCategory($this->getReference(CategoryFixtures::CAT_ARTSPLASTIQUES));
        $sheetAdmin->setDescription("Sculptez vos matière");
        $sheetAdmin->setIrl(true);
        $sheetAdmin->setVisio(false);
        $sheetAdmin->setImageURL(self::PICS_URL."lingerie");
        $sheetAdmin->setLanguage(['Belge','Quebecois','portugais']);
        $this->addReference(self::COPRO, $sheetAdmin);
        $manager->persist($sheetAdmin);
        
        for ($i = 1 ; $i <= self::NB_SHEET ; $i++) {
            $sheet[$i] = new Sheet();
            $sheet[$i]->setTitle($faker->catchPhrase);
            $sheet[$i]->setTokenPrice(mt_rand(0,5));
            $sheet[$i]->setUser($this->getReference("user".mt_rand(2,(UserFixtures::NB_USER))));
            $sheet[$i]->setCategory($this->getReference(CategoryFixtures::CAT_REF[mt_rand(0,count(CategoryFixtures::CAT_REF)-1)]));
            $sheet[$i]->setDescription($faker->realText($maxNbChars = 200, $indexSize = 2));
            $sheet[$i]->setIrl( (bool)mt_rand(0,1) );
            ($sheet[$i]->isIrl()) ? $sheet[$i]->setVisio((bool)mt_rand(0,1)) : $sheet[$i]->setVisio((bool)1);

            ( (bool)mt_rand(0,1) )
                ? $sheet[$i]->setImageURL(self::PICS_URL.(self::CAT_PICS[mt_rand(0,count(self::CAT_PICS)-1)]))
                : $sheet[$i]->setImageURL(null);

            $sheet[$i]->setLanguage([self::LANGUAGE[mt_rand(0,count(self::LANGUAGE)-1)]]);
            $this->addReference("sheet$i", $sheet[$i]);
            $manager->persist($sheet[$i]);
        }

        $manager->flush();
    }

    public function random(){
        (bool)mt_rand(0,1);
    }

    public function getDependencies ()
    {
        return [
            UserFixtures::class,
            CategoryFixtures::class,
        ];
    }
}
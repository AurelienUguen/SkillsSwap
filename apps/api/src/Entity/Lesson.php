<?php

namespace App\Entity;

use App\Repository\LessonRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata as Api;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: LessonRepository::class)]
#[ORM\EntityListeners(['App\EntityListener\LessonListener'])]
#[Api\ApiResource(
    normalizationContext:['groups' => ['read_lesson']],
    denormalizationContext:['groups' => ['create_lesson']],
    operations:[
        new Api\GetCollection(
            paginationEnabled: false,// Ceci supprime la limite d'utilisateur de 30 pour le login //
        ),
        new Api\Post(),
        new Api\Get(),
        new Api\Put(),
        new Api\Delete()
    ]
)]
class Lesson
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read_lesson', 'create_lesson', 'read_user'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'lessons')]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotNull()]
    #[Groups(['read_lesson', 'create_lesson'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'lessons')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read_lesson', 'create_lesson'])]
    private ?Sheet $sheet = null;

    #[ORM\Column]
    #[Groups(['read_lesson', 'create_lesson'])]
    private ?bool $padawanValidate = false;

    #[ORM\Column]
    #[Groups(['read_lesson', 'create_lesson'])]
    private ?bool $masterValidate = false;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups(['read_lesson', 'read_sheet'])]
    private ?\DateTimeInterface $bookingDate = null;

    //#[ORM\Column(length: 255, nullable: true)]
    //#[Assert\NotNull()]
    //#[Assert\NotBlank()]
    /*#[Assert\Date(
        message: "La date n'est pas au format valide",  
    )]*/
    #[Groups(['create_lesson'])]
    private ?string $bookingDateEntry = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function isPadawanValidate(): ?bool
    {
        return $this->padawanValidate;
    }

    public function setPadawanValidate(?bool $padawanValidate): static
    {
        $this->padawanValidate = $padawanValidate;

        return $this;
    }

    public function isMasterValidate(): ?bool
    {
        return $this->masterValidate;
    }

    public function setMasterValidate(?bool $masterValidate): static
    {
        $this->masterValidate = $masterValidate;

        return $this;
    }

    public function getBookingDate(): ?\DateTimeInterface
    {
        return $this->bookingDate;
    }

    public function setBookingDate(\DateTimeInterface $bookingDate): static
    {
        $this->bookingDate = $bookingDate;

        return $this;
    }

    public function getBookingDateEntry(): ?string
    {
        return $this->bookingDateEntry;
    }

    public function setBookingDateEntry(?string $bookingDateEntry): static
    {
        $this->bookingDateEntry = $bookingDateEntry;

        return $this;
    }

    public function getSheet(): ?Sheet
    {
        return $this->sheet;
    }

    public function setSheet(?Sheet $sheet): static
    {
        $this->sheet = $sheet;

        return $this;
    }
}

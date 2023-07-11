<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use ApiPlatform\Metadata as Api;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[Api\ApiResource(
    normalizationContext:['groups' => ['read_user']],
    denormalizationContext:['groups' => ['create_user']],
    operations:[
        new Api\GetCollection(),
        new Api\Post(),
        new Api\Get(),
        new Api\Put(),
        new Api\Delete()
    ]
)]
class User
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Api\ApiProperty(identifier:false)]
    #[Groups(['read_user'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read_user','create_user'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read_user','create_user'])]
    private ?string $lastname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read_user','create_user'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read_user','create_user'])]
    private ?string $password = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read_user','create_user'])]
    private ?string $phone_number = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['read_user','create_user'])]
    private ?int $district = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read_user','create_user'])]
    private ?string $city = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Sheet::class, orphanRemoval: true)]
    #[Groups(['read_sheet'])]
    private Collection $sheets;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Lesson::class, orphanRemoval: true)]
    private Collection $lessons;

    #[ORM\Column]
    private array $roles = [];

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['read_user','create_user'])]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read_user'])]
    #[Gedmo\Slug(fields:['firstname', 'lastname', 'city'])]
    #[Api\ApiProperty(identifier:true)]
    private ?string $slug = null;

    public function __construct()
    {
        $this->sheets = new ArrayCollection();
        $this->lessons = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phone_number;
    }

    public function setPhoneNumber(?string $phone_number): static
    {
        $this->phone_number = $phone_number;

        return $this;
    }

    public function getDistrict(): ?int
    {
        return $this->district;
    }

    public function setDistrict(?int $district): static
    {
        $this->district = $district;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): static
    {
        $this->city = $city;

        return $this;
    }

    /**
     * @return Collection<int, Sheet>
     */
    public function getSheets(): Collection
    {
        return $this->sheets;
    }

    public function addSheet(Sheet $sheet): static
    {
        if (!$this->sheets->contains($sheet)) {
            $this->sheets->add($sheet);
            $sheet->setUser($this);
        }

        return $this;
    }

    public function removeSheet(Sheet $sheet): static
    {
        if ($this->sheets->removeElement($sheet)) {
            // set the owning side to null (unless already changed)
            if ($sheet->getUser() === $this) {
                $sheet->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Lesson>
     */
    public function getLessons(): Collection
    {
        return $this->lessons;
    }

    public function addLesson(Lesson $lesson): static
    {
        if (!$this->lessons->contains($lesson)) {
            $this->lessons->add($lesson);
            $lesson->setUser($this);
        }

        return $this;
    }

    public function removeLesson(Lesson $lesson): static
    {
        if ($this->lessons->removeElement($lesson)) {
            // set the owning side to null (unless already changed)
            if ($lesson->getUser() === $this) {
                $lesson->setUser(null);
            }
        }

        return $this;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }
}
